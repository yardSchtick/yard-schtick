import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import './EditProfile.css'


class EditProfile extends Component {
    constructor(){
        super()

        this.state = {
            nameInput:'',
            addressStreet:'',
            addressCity:'',
            addressState:'',
            addressZip:'',
            geoLat:'',
            geoLng:'',
            imageUrl:''


        }
        this.handleNameInput = this.handleNameInput.bind(this)
        this.handleAddressStreet = this.handleAddressStreet.bind(this)
        this.handleAddressCity = this.handleAddressCity.bind(this)
        this.handleAddressState = this.handleAddressState.bind(this)
        this.handleAddressZip = this.handleAddressZip.bind(this)
        this.handleGeo = this.handleGeo.bind(this)
        this.handleImageUrl = this.handleImageUrl.bind(this)
        this.submitButtonClicked = this.submitButtonClicked.bind(this)
       
    }
    submitButtonClicked(){
        console.log("submit button was clicked")
        this.handleGeo()
    }
    handleImageUrl(event){
        this.setState({
            imageUrl: event.target.value
        })
    }
    handleNameInput(event){
        this.setState({
            nameInput: event.target.value
        })
    }
    handleAddressStreet(event){
        this.setState({
            addressStreet: event.target.value
        })
    }
    handleAddressCity(event){
        this.setState({
            addressCity: event.target.value
        })
    }
    handleAddressState(event){
        this.setState({
            addressState: event.target.value
        })
    }
    handleAddressZip(event){
        this.setState({
            addressZip: event.target.value
        })
    }
    handleGeo(){
        axios({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.addressStreet},${this.state.addressCity},${this.state.addressState},${this.state.addressZip}&key=AIzaSyCtb8eSgekxRgxSDay7RzJW09YEsTmBOmc`,
            method: 'get',
        }).then((response) => {
            this.setState({
                geoLat: response.data.results[0].geometry.location.lat,
                geoLng: response.data.results[0].geometry.location.lng
            })
            console.log('gps spot',response.data.results[0].geometry.location)
            console.log("geo?", this.state)
        })
        
    }
    render() {
        console.log("editprofile props", this.props,this.state)
        return (
            <div>
                <div>name <input onChange={ this.handleNameInput }></input></div>
                <div>profile Pic <input onChange={ this.handleImageUrl }></input><div className='editUserProfilePic'/></div>
                <div>address <input onChange={ this.handleAddressStreet }></input></div>
                <div>city<input onChange={ this.handleAddressCity }></input></div>
                <div>state <input onChange={ this.handleAddressState }></input></div>
                <div>zip <input onChange={ this.handleAddressZip }></input></div>
                <button onClick={this.submitButtonClicked}>submit</button>

            </div>
        );
    }
}

function mapStateToProps(state) { return state }
export default connect(mapStateToProps, {})(EditProfile);