import React from 'react';

export default class ImageControl extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.resetFileInput = this.resetFileInput.bind(this);
  }

  resetFileInput() {
    this.fileInput.current.value = null;
  }

  componentWillReceiveProps(props) {
    if (props.value === null) {
      this.resetFileInput();
    }
  }

  render() {
    const { title, value, onChange, removeImage, ...restProps } = this.props;

    const preview = (this.props.value)
      ? <img className='preview' src={this.props.value} />
      : null;

    return (
      <label className='ImageControl'>{this.props.title}
        <div className='input'>
          <div>
            <input ref={this.fileInput} type='file' {...restProps} onChange={this.props.onChange} />
          </div>
          {preview}
        </div>
      </label>
    );
  }
}
