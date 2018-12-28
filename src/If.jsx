import React from 'react';

export default class If extends React.Component {
  render() {
    if (this.props.true) {
      return this.props.children;
    } else {
      return null;
    }
  }
}