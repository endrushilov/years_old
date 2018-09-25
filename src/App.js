import React, { Component } from 'react';
import './App.css';
import Year from './components/year';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
          <Year/>
      </div>
    );
  }
}

export default App;
