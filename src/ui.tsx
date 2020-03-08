import React from 'react';
import ReactDOM from 'react-dom';

import { Select, Button } from 'figma-styled-components';
import { CONVENTIONS } from './constants';

import './style.css';

declare function require(path: string): any

interface SelectOption {
  label: string;
  value: string;
}

class App extends React.Component<{}, {}> {
  render() {
    const options: SelectOption[] = CONVENTIONS.map(conv => {
      return { label: conv, value: conv };
    });

    return (
      <div>
        <Select id="convention" options={options} />
        <Button id="export" variant="secondary" fullWidth>Export</Button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('plugin'));