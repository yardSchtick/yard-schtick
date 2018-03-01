import React, { Component } from 'react';
// import {GETURL} from './../../../Duck/redux';
import { connect } from 'react-redux';



class EditSale extends Component {
    constructor() {
        super()

        this.state = {
            saleName: '',
            saleDesc: '',
            saleStartTime: '',
            saleEndTime: '',
            saleStartDate: '',
            saleEndDate: '',
            saleImage: ''


        }
        this.handleSaleName = this.handleSaleName.bind(this)
        this.handleSaleDesc = this.handleSaleDesc.bind(this)
        this.handleStartTime = this.handleStartTime.bind(this)
        this.handleEndTime = this.handleEndTime.bind(this)
        this.handleStartDate = this.handleStartDate.bind(this)
        this.handleEndDate = this.handleEndDate.bind(this)
        this.handleSaleImage = this.handleSaleImage.bind(this)
        this.submitButtonClicked = this.submitButtonClicked.bind(this)

    }
    submitButtonClicked() {
        console.log("submit button was clicked")
    }
    handleSaleImage(event) {
        this.setState({
            saleImage: event.target.value
        })
    }
    handleSaleName(event) {
        this.setState({
            saleName: event.target.value
        })
    }
    handleSaleDesc(event) {
        this.setState({
            saleDesc: event.target.value
        })
    }
    handleStartTime(event) {
        this.setState({
            saleStartTime: event.target.value
        })
    }
    handleEndTime(event) {
        this.setState({
            saleEndTime: event.target.value
        })
    }
    handleStartDate(event) {
        this.setState({
            saleStartDate: event.target.value
        })
    }
    handleEndDate(event) {
        this.setState({
            saleEndDate: event.target.value
        })
    }
    componentDidMount() {

    }

    render() {
        return (
            <div className="editSaleContainer">
                <h1>Edit Sale</h1>
                <div className="timeDate">
                    <label>sale name </label>
                    <input onChange={this.handleSaleName}></input>
                    <label>sale pic </label><span className="glyphicon glyphicon-picture" />
                    <input type='file' onChange={this.handleSaleImage}></input><div className='editUserProfilePic' style={{ backgroundImage: `url('${this.state.saleImage}')` }} />
                    <label>sale Desc </label> <span class="glyphicon glyphicon-edit"></span><br />
                    <textarea className="editSaleText" onChange={this.handleSaleDesc}></textarea><br />
                    <label>start time </label><span className="glyphicon glyphicon-time" />
                    <input type='time' onChange={this.handleStartTime}></input>
                    <label>end time </label><span className="glyphicon glyphicon-time" />
                    <input type='time' onChange={this.handleEndTime}></input>
                    <label>start date </label><span className="glyphicon glyphicon-calendar" />
                    <input type='date' onChange={this.handleStartDate}></input>
                    <label>end date</label> <span className="glyphicon glyphicon-calendar" />
                    <input type='date' onChange={this.handleEndDate}></input>
                    <button className="editSaleButton" onClick={this.submitButtonClicked}>submit</button>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {})(EditSale);

