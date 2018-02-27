import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GETURL } from '../../Duck/redux'
import { connect } from 'react-redux'
import axios from 'axios'
import './Login.css';
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
      <div className="login-container">
        <div className='button-container'>
          <a href={process.env.REACT_APP_LOGIN}>
            <button className="btn">Login</button>
          </a>
          <Link to='/CreateAccount'><button className="btn">Create Account</button></Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    url: state.url
  }
}

export default connect(mapStateToProps, { GETURL })(Login);