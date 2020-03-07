const SNAKE_CASE = 'snake_case';
const CAMEL_CASE = 'camelCase';

const CONVENTIONS = [
  'original',
  SNAKE_CASE,
  CAMEL_CASE
];

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  console.log(msg)

  switch (msg.type) {
  case 'load':
    figma.ui.postMessage({ type: 'load', value: CONVENTIONS });
    break;

  case 'export':
    const convention: string = msg.value;
    exportAs(convention);
    break;

  default:
    console.log('hello world');
  }
};

function exportAs(convention: string) {
  const filename = figma.root.name;

  switch (convention) {
  case SNAKE_CASE:
    console.log(toSnakeCase(filename));
    break;
  case CAMEL_CASE:
    console.log(toCamelCase(filename));
    break;
  default:
    console.log(filename);
  }

  figma.closePlugin();
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
  return value[0].toUpperCase() + value.substr(1).toLowerCase();
}