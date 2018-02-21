import React, { Component } from 'react';
import Footer from '../components/Footer/Footer';
import { connect } from 'react-redux';
import { GETURL } from '../../Duck/redux';

class AddInventory extends Component {

  componentDidMount() {
    this.props.GETURL(this.props.match.url)
  }
  render() {
    return (
      <div >
        This is the AddInventory Page


      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps, { GETURL })(AddInventory);