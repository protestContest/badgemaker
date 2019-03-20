import React from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { closePicker } from './actions';
import Canvas from './Canvas';
import SaveList from './SaveList';
import ControlPanel from './ControlPanel';
import '../style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onAppClick = this.onAppClick.bind(this);
  }

  onAppClick() {
    if (this.props.pickerOpen) {
      this.props.closePicker();
    }
  }

  render() {
    return (
      <div className="App" onClick={this.onAppClick}>
        <Canvas />
        <SaveList />
        <ControlPanel />
        <a className='feedback' href='mailto:zackm@zillowgroup.com?subject=Badgemaker%20Feedback'>FEEDBACK</a>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pickerOpen: state.ui.openPicker !== null
});

const mapDispatchToProps = (dispatch) => ({
  closePicker: () => dispatch(closePicker())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

