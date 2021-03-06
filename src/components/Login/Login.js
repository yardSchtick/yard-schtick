import React, { Component } from 'react';
import { GETURL } from '../../Duck/redux'
import { connect } from 'react-redux'
import '../../assets/neighborhood.jpg';


class Login extends Component {

  componentDidMount() {
    this.props.GETURL(this.props.match.url)
  }

  render() {

    return (
      <div>
        <div className="loginBanner"></div>
        <div className="loginBannerFade"></div>
        <div id='loginContainer'>
          <a href={process.env.REACT_APP_LOGIN}>
            <button id="loginButton">Login</button>
          </a>
          <a href={process.env.REACT_APP_LOGIN}>
            <button id="accountButton">Create Account</button>
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    url: state.url,
    user: state.user
  }
}

export default connect(mapStateToProps, { GETURL })(Login);