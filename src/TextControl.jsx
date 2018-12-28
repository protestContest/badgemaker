import React from 'react';

export default class TextControl extends React.Component {
  render() {
    const { title, value, onChange, ...restProps } = this.props;

    return (
      <label className='TextControl'>{this.props.title}
        <div className='input'>
          <input type='text' {...restProps} value={this.props.value} onChange={this.props.onChange} />
        </div>
      </label>
    );
  }
}
