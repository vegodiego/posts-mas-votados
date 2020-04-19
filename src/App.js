import React, { Component } from 'react';
import './App.css';
import Posts from './posts';


class App extends Component {
  render() {
    return (
      <div className="container">
        <div>
          <h1 className="text-center">Blog posts populares</h1>
          <hr />
        </div>
        <Posts />
      </div>
    );
  }
}


export default App;
