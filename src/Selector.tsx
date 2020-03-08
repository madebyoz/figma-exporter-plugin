import React, { ReactElement } from "react";

import { Select } from 'figma-styled-components';
import { CONVENTIONS } from './constants';

interface Option {
  label: string;
  value: string;
}

class Selector extends React.PureComponent<{}, {}> {
  options(): Option[] {
    return CONVENTIONS.map(conv => {
      return { label: conv, value: conv };
    });
  }

  render() {
    return (<Select id="convention" options={this.options()} />);
  }
}

export default Selector;
