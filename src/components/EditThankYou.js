import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GETURL, CLEARSALE, LOGINOUT } from '../Duck/redux';
import { Link, Redirect } from 'react-router-dom'

class EditThankYou extends Component {

  componentDidMount() {
    this.props.GETURL(this.props.match.url)
  }

  render() {
    if (!this.props.loggedin) {
      return <Redirect to='/Login' />
  }
    return (
      <div className="thankYouContainer">
        <h1 className="title" id="thankYouTitle">Your sale has been edited.</h1>
        <i className="glyphicon glyphicon-ok-sign"></i>
        <p className="subtitle" id="thankYouSubtitle">You can always</p>
        <Link to='/AddInventory'><button id="AddItemButton">Add Items to Your Sale</button></Link>
        <p className="subtitle" id="thankYouLower">if you'd like.</p>
        <div className="thankYouInner">
          <Link to="/ViewMap"><button className="thankYouButton">View Sales</button></Link>
          <Link to="/ProfileView"><button className="thankYouButton">View Profile</button></Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    url: state.url,
    loggedin: state.loggedin
  }
}

export default connect(mapStateToProps, { GETURL, CLEARSALE, LOGINOUT })(EditThankYou);