import React, { Component } from 'react';
import axios from "axios";
import { GETURL, SETUSER } from './../../../Duck/redux';
import { connect } from 'react-redux';
import './EditProfile.css';
import { Link } from 'react-router-dom'

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

    componentDidMount() {
        this.props.GETURL(this.props.match.url)
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
        var {name, street, city, state, zip} = this.state

        var tempUser = {
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
    }

    render() {
        var { name, street, city, state, zip } = this.state

        return (
            <div>
                <h1>name </h1>
                <input value={name} 
                    onChange={e => this.handleChange(e.target.value, 'name')}
                    maxlength='25'></input>

                <h1>profile Pic</h1>
                <div className="itemPic"></div>

                <h1>address</h1>
                <input value={street} 
                    onChange={e => this.handleChange(e.target.value, 'street')}
                    maxlength='50'></input>

                <h1>city</h1>
                <input value={city} onChange={e => this.handleChange(e.target.value, 'city')}
                    maxlength='25'></input>

                <h1>state</h1>
                <input value={state} onChange={e => this.handleChange(e.target.value, 'state')}
                    maxlength='2'></input>

                <h1>zip</h1>
                <input value={zip} 
                    onChange={e => this.handleChange(e.target.value, 'zip')}
                    maxlength='15'></input>

                <Link to='/ProfileView'><button onClick={this.submitChange}>Save Changes</button></Link>

            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, { GETURL, SETUSER })(EditProfile);

