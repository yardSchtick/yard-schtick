import React, { Component } from 'react';
import Routes from './routes';
import Footer from './components/Footer/Footer';
import './reset.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div >
        <Routes />

        <Footer />
      </div>
    );
  }
}

export default App;
