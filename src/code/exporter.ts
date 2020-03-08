import { ExportableBytes } from "../interfaces";
import { inConvention } from "./convert";

const exportFilename = (convention: string): string => {
  const projectName = figma.root.name;
  return inConvention(convention, projectName);
}

const isValidSelection = (nodes: Readonly<SceneNode[]>): boolean => {
  return !(!nodes || nodes.length === 0);
}

const formatToBlobType = (format: string): string => {
  switch(format) {
    case "PDF": return 'application/pdf'
    case "SVG": return 'image/svg+xml'
    case "PNG": return 'image/png'
    case "JPG": return 'image/jpeg'
    default: return 'image/png'
  }
}

const formatToExtension = (format: string): string => {
  switch(format) {
    case "PDF": return '.pdf'
    case "SVG": return '.svg'
    case "PNG": return '.png'
    case "JPG": return '.jpg'
    default: return '.png'
  }
}

export async function exportAs(convention: string): Promise<string> {
  const nodes = figma.currentPage.selection;
  if (!isValidSelection(nodes)) {
    return new Promise(res => {
      res("Can't export nothing");
      figma.closePlugin();
    });
  }

  let exportableBytes: ExportableBytes[] = [];
  for (let node of nodes) {
    let settings: readonly ExportSettings[];
    const { name, exportSettings } = node;

    if (exportSettings.length === 0) {
      settings = [{ format: "PNG", suffix: '', constraint: { type: "SCALE", value: 1 }, contentsOnly: true }];
    } else {
      settings = exportSettings;
    }

    const exportName = inConvention(convention, name);
    console.log(`Exporting "${name}" as "${exportName}"`);

    for (let setting of settings) {
      const bytes = await node.exportAsync(setting);
      exportableBytes.push({
        name: exportName,
        setting: setting,
        bytes: bytes,
        blobType: formatToBlobType(setting.format),
        extension: formatToExtension(setting.format)
      });
    };
  };

  figma.showUI(__html__, { visible: false });
  figma.ui.postMessage({
    type: 'exportResults',
    value: exportableBytes,
    filename: exportFilename(convention)
  });

  return new Promise(res => res('Complete export.'));
}
