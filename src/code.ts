import { exportAs } from './code/exporter';

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { visible: true, width: 240, height: 160 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the posted message.
figma.ui.onmessage = async (msg) => {
  switch (msg.type) {
  case 'export':
    figma.notify('Exporing files...');
    const convention: string = msg.value;

    // Resume after 1 second to allow UI to re-render.
    setTimeout(() => {
      exportAs(convention)
      .then(res => console.log(res));
    }, 1);
    break;

  default:
    console.log('Closing Plugin!');
    figma.notify('Done!');
    figma.closePlugin();
  }
};
