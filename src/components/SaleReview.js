import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GETURL, CLEARSALE } from '../Duck/redux';
import { Link } from 'react-router-dom';
import axios from 'axios'

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
    this.formatTime()

  }

  formatTime = () => {
    var one = this.convertMilitary(this.props.newSale.start_time)
    var two = this.convertMilitary(this.props.newSale.end_time)

    this.setState({ time: one + ' - ' + two })
  }

  convertMilitary = (time) => {
    var tempTime = time.split(':').splice(0, 2);

    if (+tempTime[0] < 12) {
      if (+tempTime[0] === 0) {
        tempTime[0] = 12
      }
      tempTime[0] = +tempTime[0]
      return tempTime.join(':') + ' AM'
    }
    if (+tempTime[0] !== 12) {
      tempTime[0] = +tempTime[0] - 12
    }
    return tempTime.join(':') + ' PM'
  }

  formatDate = () => {
    var tempArr1 = []
    var tempArr2 = []
    var tempDate = this.props.newSale.start_date.split('-').reverse()
    tempArr1[0] = tempDate[1]
    tempArr1[1] = tempDate[0]
    tempArr1[2] = tempDate[2]
    tempDate = this.props.newSale.end_date.split('-').reverse()
    tempArr2[0] = tempDate[1]
    tempArr2[1] = tempDate[0]
    tempArr2[2] = tempDate[2]
    var finalArr = tempArr1.join('/') + ' - ' + tempArr2.join('/')
    this.setState({ date: finalArr })
  }

  submitSale = () => {
    if (!this.props.newSale.id) {
      axios.post('/api/newSale',this.props.newSale).then(res => {
        this.props.CLEARSALE()
      })
    } else {
      axios.put('/api/updateSale',this.props.newSale).then(res => {
        this.props.CLEARSALE()
      })
    }
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

        <Link to="/ThankYou"><button onClick={this.submitSale}>Looks good to me!</button></Link>
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

export default connect(mapStateToProps, { GETURL, CLEARSALE })(SaleReview);