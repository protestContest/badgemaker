import React from 'react';

export default class ToggleControl extends React.Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
  }

  change(event) {
    event.target.value = event.target.checked;
    this.props.onChange(event);
  }

  render() {
    const { title, value, onChange, ...restProps } = this.props;

    return (
      <label className='ToggleControl'>{this.props.title}
        <div className='input'>
          <input type='checkbox' {...restProps} defaultChecked={value} onChange={this.props.onChange} />
        </div>
      </label>
    );
  }
}
