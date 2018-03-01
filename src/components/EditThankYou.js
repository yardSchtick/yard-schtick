import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GETURL, CLEARSALE } from '../Duck/redux';
import { Link } from 'react-router-dom'

class EditThankYou extends Component {

  componentDidMount() {
    this.props.GETURL(this.props.match.url)
  }

  render() {
    return (
      <div className="thankYouContainer">
        <h1 className="title" id="thankYouTitle">Your sale has been edited.</h1>
        <p className="subtitle" id="thankYouSubtitle">Would you like to </p>
        <Link to='/AddInventory'><button id="profileAddSaleButton">Add Items to Your Sale</button></Link>
        <p className="subtitle" id="thankYouSubtitle">to help people focus in on your sale?</p>
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
    url: state.url
  }
}

export default connect(mapStateToProps, { GETURL, CLEARSALE })(EditThankYou);