import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {GETURL } from '../../Duck/redux'
import {connect} from 'react-redux'
import axios from 'axios'
import '../../assets/neighborhood.jpg';

class Login extends Component {

  componentDidMount() {
    this.props.GETURL(this.props.match.url)
  }

  componentWillUnmount() {
    axios.get('/api/loginDummy')
  }

  render() {
    return (
      <div id='loginContainer'>
          <Link to='/ProfileView'><button id="loginButton">Login</button></Link>
          <Link to='/CreateAccount'><button id="accountButton">Create Account</button></Link>
      </div>
    );
  }
}

function mapStateToProps(state) { 
  return {
      url: state.url
  }
}

export default connect(mapStateToProps, {GETURL})(Login);