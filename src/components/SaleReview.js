import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GETURL } from '../Duck/redux';
import { Link } from 'react-router-dom'

class SaleReview extends Component {
  constructor() {
    super()

    this.state = {
      date: '',
      time: ''
    }
  }

  componentDidMount() {
    this.props.GETURL(this.props.match.url)
    this.formatDate()

    var tempStr = this.props.newSale.start_time.split('').splice(0,5).join('') + ' - ' + this.props.newSale.end_time.split('').splice(0,5).join('')
    this.setState({time: tempStr})
  }

  formatDate = () => {
    var tempArr1 = []
    var tempArr2 = []
    var tempDate = this.props.newSale.start_date.split('-').reverse()
    tempArr1[0] = tempDate[1]
    tempArr1[1] = tempDate[0]
    tempArr1[2] = tempDate [2]
    tempDate = this.props.newSale.end_date.split('-').reverse()
    tempArr2[0] = tempDate[1]
    tempArr2[1] = tempDate[0]
    tempArr2[2] = tempDate [2]
    var finalArr = tempArr1.join('/') + ' - ' + tempArr2.join('/')
    this.setState({date: finalArr})
  }
  render() {
    var { user, newSale } = this.props

    return (
      <div >
        <Link to="/SaleDescription"><button className="itemPic"></button></Link>
        <h2>Review</h2>
        <p>Address</p>
        <Link to="/ProfileView"><button>{user.address_street}<br/>{user.address_city},{user.address_state} {user.address_zip}</button></Link>
        <p>Time</p>
        <Link to="/AddNewSale"><button>{this.state.time}</button></Link>
        <p>Date</p>
        <Link to="/AddNewSale"><button>{this.state.date}</button></Link>
        <p>Description</p>
        <Link to="/SaleDescription"><button>{newSale.sale_desc}</button></Link>

      {/* WHEN THIS SUBMITS DON'T FORGET TO EMPTY NEWSALE OBJECT */}
        <Link to="/ThankYou"><button>Looks good to me!</button></Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    newSale: state.newSale
  }
}

export default connect(mapStateToProps, { GETURL })(SaleReview);