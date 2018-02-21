import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import './Login.css';
import '../../assets/neighborhood.jpg';

class Login extends Component {
  render() {
    return (
      <div className="login-container">
        <div className='button-container'>
          <Link to='/ProfileView'><button className="btn">Login</button></Link>
          <Link to='/CreateAccount'><button className="btn">Create Account</button></Link>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;