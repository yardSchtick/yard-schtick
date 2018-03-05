import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GETURL, CLEARSALE, currentSale } from '../Duck/redux';
import { Link } from 'react-router-dom';
import axios from 'axios'

class SaleReview extends Component {
  constructor(props) {
    super(props)

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
      axios.post('/api/newSale', {
        newSale: this.props.newSale,
        user_id: this.props.user.id}).then(res => {
        this.props.currentSale(res.data[0])
      }).then(res => {
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
        <div>
          <Link to="/SaleDescription"><button className="reviewBanner"></button></Link>
          <div className="reviewBannerSideFade"></div>
          <div className="reviewBannerBottomFade"></div>
          <h2 className="reviewTitle">Review</h2>
        </div>

        <div className="inputContainer">
          <div className="inputIndividualContainer">
            <p>Address:</p>
            <Link to="/ProfileView"><button className="clearButton reviewButton">{user.address_street}<br />{user.address_city},{user.address_state} {user.address_zip}</button></Link>
          </div>

          <div className="inputIndividualContainer">
            <p>Time:</p>
            <Link to="/AddNewSale"><button className="clearButton reviewButton">{this.state.time}</button></Link>
          </div>

          <div className="inputIndividualContainer">
            <p>Date:</p>
            <Link to="/AddNewSale"><button className="clearButton reviewButton">{this.state.date}</button></Link>
          </div>

          <div className="inputIndividualContainer descriptionContainer">
            <p>Description:</p>
            <Link to="/SaleDescription"><button className="clearButton desciptionReview reviewButton">{newSale.sale_desc === '' ? 'No Description' : newSale.sale_desc}</button></Link>
          </div>
        </div>
        <div className="profileButtonContainer">
          {!this.props.newSale.id ?
          <Link to="/ThankYou"><button id="profileAddSaleButton" onClick={this.submitSale}>Looks good to me!</button></Link>
          :
          <Link to='/EditThankYou'><button id="profileAddSaleButton" onClick={this.submitSale}>Looks good to me!</button></Link>
          }
        </div>
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

export default connect(mapStateToProps, { GETURL, CLEARSALE, currentSale })(SaleReview);