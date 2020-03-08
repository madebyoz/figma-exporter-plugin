import React from 'react';
import ReactDOM from 'react-dom';
import JSZip from 'jszip';

import { Select, Button } from 'figma-styled-components';
import { CONVENTIONS, ORIGINAL } from './constants';

import './style.css';

declare function require(path: string): any

window.onmessage = (event) => {
  const msg = event.data.pluginMessage;
  if (!msg) return;

  if (msg.type === 'exportResults') {
    compressExport(msg.value, msg.filename)
      .then(() => {
        parent.postMessage({ pluginMessage: { type: 'close' } }, '*');
      });
  }
}

interface SelectOption {
  label: string;
  value: string;
}

interface State {
  convention: string;
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      convention: ORIGINAL
    }

    this.onSelect = this.onSelect.bind(this);
    this.onExport = this.onExport.bind(this);
  }

  onSelect(value: string) {
    this.setState({ convention: value });
  }

  onExport() {
    const pluginMessage = { type: 'export', value: this.state.convention }
    parent.postMessage({ pluginMessage: pluginMessage }, '*');
  }

  render() {
    const defaultOption: SelectOption = { label: ORIGINAL, value: ORIGINAL };
    const options: SelectOption[] = CONVENTIONS.map(conv => {
      return { label: conv, value: conv };
    });

    return (
      <div>
        <Select id="convention" options={options} defaultValue={defaultOption} onChange={this.onSelect} />
        <Button id="export" variant="secondary" fullWidth onClick={this.onExport}>Export</Button>
      </div>
    )
  }
}

function toBuffer(ary) {
  return ary.buffer.slice(ary.byteOffset, ary.byteLength + ary.byteOffset);
}

async function compressExport(exportableBytes, filename): Promise<any> {
  return new Promise(res => {
    let zip = new JSZip();

    for (let data of exportableBytes) {
      const { name, setting, bytes, blobType, extension } = data;
      const buffer = toBuffer(bytes);

      let blob = new Blob([buffer], { type: blobType })
      zip.file(`${name}${setting.suffix}${extension}`, blob, { base64: true });
    }

    zip.generateAsync({ type: 'blob' })
      .then((content) => {
        const blobURL = window.URL.createObjectURL(content);
        const link = document.createElement('a');
        link.className = 'button button-primary';
        link.href = blobURL;
        link.download = `${filename}.zip`
        link.click()
        link.setAttribute('download', `${name}.zip`);
        res();
      })
  })
}

ReactDOM.render(<App />, document.getElementById('plugin'));