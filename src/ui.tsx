import React from 'react';
import ReactDOM from 'react-dom';

import { Select, Button } from 'figma-styled-components';
import { UISelectOption as Option, UIState as State } from "./interfaces";
import { CONVENTIONS, ORIGINAL } from './constants';
import { compressExport } from "./ui/exporter";

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
    const defaultOption: Option = { label: ORIGINAL, value: ORIGINAL };
    const options: Option[] = CONVENTIONS.map(conv => {
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

ReactDOM.render(<App />, document.getElementById('plugin'));