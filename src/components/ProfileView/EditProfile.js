import React, { Component } from 'react';
import axios from "axios";
import { SETUSER } from './../../Duck/redux';
import { connect } from 'react-redux';

class EditProfile extends Component {
    constructor() {
        super()

        this.state = {
            name: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            latitude: '',
            longitude: '',
        }
        this.getAddress = this.getAddress.bind(this);
    }

    componentDidMount() {
        this.setState({
            name: this.props.user.user_name,
            street: this.props.user.address_street,
            city: this.props.user.address_city,
            state: this.props.user.address_state,
            zip: this.props.user.address_zip
        })
    }

    handleChange = (input, type) => {
        switch (type) {
            case 'name':
                this.setState({ name: input })
                break;
            case 'street':
                this.setState({ street: input })
                break;
            case 'city':
                this.setState({ city: input })
                break;
            case 'state':
                this.setState({ state: input })
                break;
            case 'zip':
                this.setState({ zip: input })
                break;
            default:
                console.log('didn\t make it, bro')
        }
    }

    submitChange = () => {
        var { name, street, city, state, zip } = this.state

        var tempUser = {
            id: this.props.user.id,
            user_name: name,
            address_street: street,
            address_city: city,
            address_state: state,
            address_zip: zip,
            user_img: this.props.user.user_img,
            latitude: this.state.latitude,
            longitude: this.state.longitude
        }

        axios.put('/api/updateUser', tempUser).then(res => {
            this.props.SETUSER(res.data[0])
        })

        this.props.toggleEditShow()
    }

    getAddress() {
        let getGeoForAddress = `${this.state.street},${this.state.city},${this.state.state},${this.state.zip}`
        axios.get(`/api/geo/${getGeoForAddress}`).then((response) => {
            this.setState({
                latitude: response.data.lat,
                longitude: response.data.lng
            })
            this.submitChange()
        })
    }
    render() {

        var { name, street, city, state, zip } = this.state

        return (
            <div className="profileDisplay">
                <div className="userPic"></div>
                <div className="userInfo">
                    <input value={name}
                        id="profileInput"
                        placeholder='Name'
                        onChange={e => this.handleChange(e.target.value, 'name')}
                        maxLength='25'></input>

                    <input value={street}
                        id="profileInput"
                        placeholder='Street Address'
                        onChange={e => this.handleChange(e.target.value, 'street')}
                        maxLength='50'></input>

                    <input value={city}
                        id="profileInput"
                        placeholder='City'
                        onChange={e => this.handleChange(e.target.value, 'city')}
                        maxLength='25'></input>

                    <input value={state}
                        id="profileInput"
                        placeholder='State'
                        onChange={e => this.handleChange(e.target.value, 'state')}
                        maxLength='2'></input>

                    <input value={zip}
                        id="profileInput"
                        placeholder='Zip Code'
                        onChange={e => this.handleChange(e.target.value, 'zip')}
                        maxLength='15'></input>

                    <button id="updateProfileButton" onClick={this.getAddress}>Save Changes</button>
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
export default connect(mapStateToProps, { SETUSER })(EditProfile);

