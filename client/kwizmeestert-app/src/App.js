import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SocketContainer from './containers/socket-container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SocketContainer />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
            {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
