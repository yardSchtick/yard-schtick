import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GETURL } from '../Duck/redux';
import { Link } from 'react-router-dom'

class ThankYou extends Component {

  componentDidMount() {
    this.props.GETURL(this.props.match.url)
  }

  render() {
    return (
      <div >
        <h2>Thank You For Your Post!</h2>
      <Link to="/ViewMap"><button>View Map</button></Link>
      <Link to="/ProfileView"><button>View Sales</button></Link>
      </div>
    );
  }
}

function mapStateToProps(state) { return {
  url: state.url
}}

export default connect(mapStateToProps, { GETURL })(ThankYou);