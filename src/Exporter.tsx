import React from "react";
import { Button } from 'figma-styled-components';

class Exporter extends React.PureComponent<{}, {}> {
  render() {
    return (
      <Button id="export" variant="secondary" fullWidth>Export</Button>
    )
  }
}

export default Exporter;
