import React, { Component } from 'react';
import Footer from '../components/Footer/Footer';
import { connect } from 'react-redux';
import { GETURL } from '../Duck/redux';

class SaleReview extends Component {

  componentDidMount() {
    this.props.GETURL(this.props.match.url)
  }
  
  render() {
    return (
      <div >
        This is the SaleReview Page
        

      </div>
    );
  }
}

function mapStateToProps(state) { return {
  url: state.url
}}

export default connect(mapStateToProps, { GETURL })(SaleReview);