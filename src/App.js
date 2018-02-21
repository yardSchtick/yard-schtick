import React, { Component } from 'react';
import Routes from './routes';
import { Link } from 'react-router-dom';
import Footer from './components/Footer/Footer';
// import EditProfile from './components/EditProfile/EditProfile'

import './App.css';

class App extends Component {
  render() {
    return (
      <div >

        <nav>
        <Link to="/MapView" className='links'>YardSchtick</Link>
        </nav>

        <Routes />
        
      </div>
    );
  }
}

export default App;
