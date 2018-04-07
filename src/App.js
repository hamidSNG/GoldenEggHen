import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ClientChangesChart from './Model/ClientChangesChart.js';





class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
<<<<<<< HEAD
        </p>
        
        <ClientChangesChart /> 
      
=======
        </p>   

      <SymbolInfo isin ="IRO1IKCO0001" />
>>>>>>> 7aba71c617a457fb11eb1ae57ee6a08a933bda98
      </div>
    );
  }
}

export default App;
