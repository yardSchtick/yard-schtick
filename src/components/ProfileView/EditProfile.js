import React, { Component } from 'react';
import axios from "axios";
import { SETUSER } from './../../Duck/redux';
import { connect } from 'react-redux';

class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: props.user.user_name,
            street: props.user.address_street,
            city: props.user.address_city,
            state: props.user.address_state,
            zip: props.user.address_zip
        }
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
            user_img: this.props.user.user_img
        }

        axios.put('/api/updateUser', tempUser).then(res => {
            this.props.SETUSER(res.data)
        })

        this.props.toggleEditShow()
    }

    render() {
        var { name, street, city, state, zip } = this.state

        return (
            <div className="profileDisplay">
                <div className="userPic"></div>
                <div className="userInfo">
                    <input value={name}
                            placeholder='Name'
                            onChange={e => this.handleChange(e.target.value, 'name')}
                            maxLength='25'></input>

                        <input value={street}
                            placeholder='Street Address'
                            onChange={e => this.handleChange(e.target.value, 'street')}
                            maxLength='50'></input>

                            <input value={city}
                                placeholder='City'
                                onChange={e => this.handleChange(e.target.value, 'city')}
                                maxLength='25'></input>

                            <input value={state} 
                                placeholder='State'
                                onChange={e => this.handleChange(e.target.value, 'state')}
                                maxLength='2'></input>

                            <input value={zip}
                                placeholder='Zip Code'
                                onChange={e => this.handleChange(e.target.value, 'zip')}
                                maxLength='15'></input>
                
                        <button id="updateProfileButton" onClick={this.submitChange}>Save Changes</button>
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

