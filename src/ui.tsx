import React from 'react';
import ReactDOM from 'react-dom';

declare function require(path: string): any

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h3>Export Settings</h3>
        <select id="convention"></select>
        <button id="export">Export</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('plugin'));