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
        <Link to='/AddInventory'><button>Add Items</button></Link>
        <div>
          <Link to="/ViewMap"><button>View Sales</button></Link>
          <Link to="/ProfileView"><button>View Profile</button></Link>
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

export default connect(mapStateToProps, { GETURL })(ThankYou);