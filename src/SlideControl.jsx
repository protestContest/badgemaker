import React from 'react';

export default class SlideControl extends React.Component {
  render() {
    const { title, value, onChange, showValue, ...restProps } = this.props;

    const valueLabel = (showValue)
      ? <span className='value'>{this.props.value}</span>
      : null;

    return (
      <label className='SlideControl'>{this.props.title}
        <div className='input'>
          <input type='range' {...restProps} value={this.props.value} onChange={this.props.onChange} />
          {valueLabel}
        </div>
      </label>
    );
  }
}
