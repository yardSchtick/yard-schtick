import React, { Component } from 'react';
import axios from "axios";
import {GETURL} from './../../../Duck/redux';
import { connect } from 'react-redux';



class EditSale extends Component {
    constructor(){
        super()

        this.state = {
            saleName:'',
            saleDesc:'',
            saleStartTime:'',
            saleEndTime:'',
            saleStartDate:'',
            saleEndDate:'',
            saleImage:''


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
    submitButtonClicked(){
        console.log("submit button was clicked")
    }
    handleSaleImage(event){
        this.setState({
            saleImage: event.target.value
        })
    }
    handleSaleName(event){
        this.setState({
            saleName: event.target.value
        })
    }
    handleSaleDesc(event){
        this.setState({
            saleDesc: event.target.value
        })
    }
    handleStartTime(event){
        this.setState({
            saleStartTime: event.target.value
        })
    }
    handleEndTime(event){
        this.setState({
            saleEndTime: event.target.value
        })
    }
    handleStartDate(event){
        this.setState({
            saleStartDate: event.target.value
        })
    }
    handleEndDate(event){
        this.setState({
            saleEndDate: event.target.value
        })
    }
    
    
    render() {
        console.log("editprofile props", this.props,this.state)
        return (
            <div>
                <div>sale name <input onChange={ this.handleSaleName }></input></div>
                <div>sale pic <input type='file' onChange={ this.handleSaleImage }></input><div className='editUserProfilePic' style = {{backgroundImage: `url('${this.state.saleImage}')` }}/></div>
                <div>sale Desc <textarea onChange={ this.handleSaleDesc }></textarea></div>
                <div>start time<input type='time' onChange={ this.handleStartTime }></input></div>
                <div>end time <input type='time' onChange={ this.handleEndTime }></input></div>
                <div>start date <input type='date' onChange={ this.handleStartDate }></input></div>
                <div>end date <input type='date' onChange={ this.handleEndDate }></input></div>
                <button onClick={this.submitButtonClicked}>submit</button>

            </div>
        );
    }
}


function mapStateToProps(state) { 
    return state 
}
export default connect(mapStateToProps, {})(EditSale);

