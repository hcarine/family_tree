import React, { Component } from 'react';
import Relationship from  './Relationship';
import logo from './logo.svg';
import './App.css';
import familyData from './mockData'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Relationship data={familyData}></Relationship>
      </div>
    );
  }
}

export default App;
