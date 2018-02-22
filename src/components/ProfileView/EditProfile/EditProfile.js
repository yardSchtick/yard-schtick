import React, { Component } from 'react';
import axios from "axios";
import {GETURL} from './../../../Duck/redux';
import { connect } from 'react-redux';
import './EditProfile.css';
// import SaleHistory from './../../SaleHistory/SaleHistory';

class EditProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: props.user
        }
        this.handleNameInput = this.handleNameInput.bind(this)
        this.handleAddressStreet = this.handleAddressStreet.bind(this)
        this.handleAddressCity = this.handleAddressCity.bind(this)
        this.handleAddressState = this.handleAddressState.bind(this)
        this.handleAddressZip = this.handleAddressZip.bind(this)
        this.handleGeo = this.handleGeo.bind(this)
        this.handleImageUrl = this.handleImageUrl.bind(this)
        this.submitButtonClicked = this.submitButtonClicked.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
    }

    submitButtonClicked(){
        console.log("submit button was clicked")
        this.handleGeo()
    }
    handleImageUrl(event){
        const userImg = Object.assign({}, this.state.user,{userImg: event})
        this.setState({
            user: userImg
        })
    }
    handleNameInput(event){
        const userName = Object.assign({}, this.state.user,{userName: event})
        this.setState({
            user: userName
        })
    }
    handleAddressStreet(event){
        const addressStreet = Object.assign({}, this.state.user,{addressStreet: event})
        this.setState({
            user: addressStreet
        })
    }
    handleAddressCity(event){
        const addressCity = Object.assign({}, this.state.user,{addressCity: event})
        this.setState({
            user: addressCity
        })
    }
    handleAddressState(event){
        const addressState = Object.assign({}, this.state.user,{addressState: event})
        this.setState({
            user: addressState
        })
    }
    handleAddressZip(event){
        const addressZip = Object.assign({}, this.state.user,{addressZip: event})
        this.setState({
            user: addressZip
        })
    }
    handleGeo(){
        axios({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.user.addressStreet},${this.state.user.addressCity},${this.state.user.addressState},${this.state.user.addressZip}&key=${process.env.API_KEY}`,
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


    updateProfile(){
        axios.put('/api/updateUser',{
            address_street: this.state.user.addressStreet,
            address_city: this.state.user.addressCity,
            address_state: this.state.user.addressState,
            address_zip: this.state.user.addressZip,
            latitude: this.state.user.geoLat,
            longitude: this.state.user.geoLng,
            userName: this.state.user.userName,
            user_img: this.state.user.userImg
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    // componentDidMount(){
    //     this.getUserInfo()
    //     this.getUserSales()
    //     this.props.GETURL(this.props.match.url)
    // }
    render() {
        console.log("editprofile props", this.props,this.state)
        return (
            <div>
                <div>name <input onChange={ this.handleNameInput }></input></div>
                <div>profile Pic <input onChange={(e) => this.handleImageUrl(e.target.value) }></input><div className='editUserProfilePic' style = {{backgroundImage: `url('${this.state.imageUrl}')` }}/></div>
                <div>address <input onChange={(e) => this.handleAddressStreet(e.target.value) }></input></div>
                <div>city<input onChange={(e) =>  this.handleAddressCity(e.target.value) }></input></div>
                <div>state <input onChange={(e) =>  this.handleAddressState(e.target.value) }></input></div>
                <div>zip <input onChange={(e) =>  this.handleAddressZip(e.target.value) }></input></div>
                <button onClick={() => this.submitButtonClicked}>submit</button>

            </div>
        );
    }
}


function mapStateToProps(state) { 
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {GETURL})(EditProfile);

