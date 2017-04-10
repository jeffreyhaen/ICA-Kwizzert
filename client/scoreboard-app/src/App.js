import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from './logo.svg';
import './App.css';

import SocketContainer from './containers/socket/socket-container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SocketContainer />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Scoreboard</h2>
        </div>
        <div>
            <br />
            {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
