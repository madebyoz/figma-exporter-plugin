import React from 'react';
import ReactDOM from 'react-dom';

declare function require(path: string): any

import Selector from './Selector';
import Exporter from "./Exporter";

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Selector />
        <Exporter />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('plugin'));
