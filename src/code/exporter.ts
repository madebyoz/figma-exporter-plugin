import { KEBAB_CASE, SNAKE_CASE, CAMEL_CASE } from "../constants";
import { ExportableBytes } from "../interfaces";

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

function inConvention(convention: string, value: string): string {
  switch (convention) {
    case KEBAB_CASE:
      return toKebabCase(value);

    case SNAKE_CASE:
      return toSnakeCase(value);

    case CAMEL_CASE:
      return toCamelCase(value);

    default:
      return value;
    }
}

function exportFilename(convention: string): string {
  const projectName = figma.root.name;
  return inConvention(convention, projectName);
}

function toKebabCase(value: string): string {
  const regex = /[\s\W]+/g
  return value.replace(regex, '-').toLowerCase();
}

function toSnakeCase(value: string): string {
  const regex = /[\s\W]+/g
  return value.replace(regex, '_').toLowerCase();
}

function toCamelCase(value: string): string {
  const result = value.split(/[\s\W]/g).map((str, idx) => {
    return idx == 0 ? str.toLowerCase() : capitalize(str);
  });
  return result.join('');
}

function capitalize(value: string): string {
  if (value.length < 2)
    return value.toUpperCase();
  return value[0].toUpperCase() + value.substr(1).toLowerCase();
}

function isValidSelection(nodes: Readonly<SceneNode[]>): boolean {
  return !(!nodes || nodes.length === 0);
}

function formatToBlobType(format: string): string {
  switch(format) {
    case "PDF": return 'application/pdf'
    case "SVG": return 'image/svg+xml'
    case "PNG": return 'image/png'
    case "JPG": return 'image/jpeg'
    default: return 'image/png'
  }
}

function formatToExtension(format: string): string {
  switch(format) {
    case "PDF": return '.pdf'
    case "SVG": return '.svg'
    case "PNG": return '.png'
    case "JPG": return '.jpg'
    default: return '.png'
  }
}