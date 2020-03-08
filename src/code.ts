import { exportAs } from './code/exporter';

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { visible: true, width: 240, height: 100 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the posted message.
figma.ui.onmessage = async (msg) => {
  switch (msg.type) {
  case 'export':
    const convention: string = msg.value;
    exportAs(convention)
      .then(res => console.log(res));
    break;

  default:
    console.log('Done!');
    figma.closePlugin();
  }
};
