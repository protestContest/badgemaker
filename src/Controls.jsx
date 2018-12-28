import React from 'react';
import { connect } from 'react-redux';
import { setState } from './actions';
import SlideControl from './SlideControl';
import TextControl from './TextControl';
import ToggleControl from './ToggleControl';
import ImageControl from './ImageControl';
import ColorControl from './ColorControl';
import DownloadButton from './DownloadButton';

export default class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.setProp = this.setProp.bind(this);
    this.fileInput = this.fileInput.bind(this);
  }

  setProp() {

  }

  fileInput() {

  }

  render() {
    return (
      <div className='Controls'>zxcbxcvb</div>
    );
  }
}