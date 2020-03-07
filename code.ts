const CONVENTIONS = [
  'original',
  'snake_case',
  'camelCase'
];

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  console.log(msg)

  if (msg.type === 'load') {
    figma.ui.postMessage({ type: 'load', value: CONVENTIONS });
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
};
