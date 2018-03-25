import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

import Game from './components/Game'

class App extends Component {
  render() {
    return (
        <Game boardSize="22" playerSize="25"/>
    );
  }
}

export default App;
