import React from 'react';
import { connect } from 'react-redux';
import { openPicker, closePicker } from './actions';
import { BlockPicker } from 'react-color';

class ColorControl extends React.Component {
  constructor(props) {
    super(props);
    this.colors = [
      '#19345d', '#20c063', '#0074e4', '#f0312d', '#efae5e',
      '#62c3d6', '#47c7b5', '#999999', '#333333', '#dddddd'
    ];
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  onChange(color, event) {
    event.target.value = color.hex;
    this.props.close();
    this.props.onChange(event);
  }

  toggle() {
    if (this.props.isOpen) {
      this.props.close();
    } else {
      this.props.open();
    }
  }

  render() {
    const { title, value, onChange, ...restProps } = this.props;

    const picker = (this.props.isOpen)
      ? <div className='picker'><BlockPicker color={this.props.value} colors={this.colors} onChange={this.onChange} triangle='hide' /></div>
      : null;

    return (
      <label className='ColorControl'>
        <span className='title'>{this.props.title}</span>
        <div style={{ background: this.props.value }} className='input' onClick={this.toggle}> </div>
        {picker}
      </label>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { isOpen: state.ui.openPicker === ownProps.id };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  open: () => dispatch(openPicker(ownProps.id)),
  close: () => dispatch(closePicker())
});

export default connect(mapStateToProps, mapDispatchToProps)(ColorControl);
