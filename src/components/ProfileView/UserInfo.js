import React, { Component } from 'react'

export default class UserInfo extends Component {

    render() {
        return (
            <div>
                <div className="profileDisplay">
                    <div className="userPic" style={{ backgroundImage: `url('${!this.props.user ? '' : this.props.user.user_img}')` }}></div>
                    <div className="userInfo">
                        <h2 id="userName">{!this.props.user ? '' : this.props.user.user_name}</h2>
                        <div className="userAddress">
                            <h2>{!this.props.user ? '' : this.props.user.address_street}</h2>
                            <h2>{!this.props.user ? '' : this.props.user.address_city}, {!this.props.user ? '' : this.props.user.address_state} {!this.props.user ? '' : this.props.user.address_zip}</h2>
                        </div>
                        <button id="updateProfileButton" onClick={this.props.toggleEditShow}>Update Profile</button>
                    </div>
                </div>
            </div>
        )
    }
}