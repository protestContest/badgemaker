import React from 'react';
import { hot } from 'react-hot-loader';
import Canvas from './Canvas';
import ControlPanel from './ControlPanel';
import '../style.css';

export default class App extends React.Component {



  render() {
    return (
      <div className="App">
        <Canvas />
        <ControlPanel />
        <a class='feedback' href='mailto:zackm@zillowgroup.com?subject=Badgemaker%20Feedback'>FEEDBACK</a>
      </div>
    );
  }
}


