import React, { Component } from 'react';
import axios from "axios";
// import Footer from './../Footer/Footer'

export default class EditProfile extends Component {
    constructor(){
        super()

        this.state = {
            person:{},
            stuff:{}
        }

        this.editProfileButtonClicked = this.editProfileButtonClicked.bind(this);
        this.saleButtonClicked = this.saleButtonClicked.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.getUserSales = this.getUserSales.bind(this);
    }
    saleButtonClicked(){
        console.log("sale button was clicked")
    }
    editProfileButtonClicked(){
        console.log("edit profile button was clicked")
    }
    getUserInfo(){
        return axios({
            url:'/api/getUser/',
            method:'get'
        }).then((response) =>{
            console.log("i think user info works",response.data[0])
            this.setState({
                person: response.data[0]
            })
        })
    }
    getUserSales(){
        return axios({
            url:'/api/getUserSales',
            method:'get'
        }).then((response) =>{
            console.log("get user sales",response.data[0])
            this.setState({
                stuff: response.data[0]
            })
        })
    }
    componentDidMount(){
        this.getUserInfo()
        this.getUserSales()
    }
    render() {
        console.log(this.state)
        return (
            <div>
                <div>
                    <div>{this.state.person.user_img}</div>
                    <div>profile info
                        <div> {this.state.person.user_name}</div>
                        <div> {this.state.person.address_street} </div>
                        <div>
                        <div> {this.state.person.address_city} </div>
                        <div> {this.state.person.address_state} </div>
                        <div> {this.state.person.address_zip} </div>
                        </div>
                        <button onClick={this.editProfileButtonClicked}>update profile</button>
                    </div>
                </div>
                <button onClick={this.saleButtonClicked}>sale button</button>
                <div>sale history
                    <div>
                        <div>old date</div>
                        <button>repost</button>
                        <button>delete</button>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        );
    }
}
