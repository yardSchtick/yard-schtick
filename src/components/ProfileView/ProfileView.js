import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import SaleHistory from './../SaleHistory/SaleHistory'
// import Footer from './../Footer/Footer'

class ProfileView extends Component {
    constructor(){
        super()

        this.state = {
            person:{},
            sales:[],
            saved:[]
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
        axios({
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
        axios({
            url:'/api/getUserSales',
            method:'get'
        }).then((response) =>{
            console.log("get user sales",response.data)
            this.setState({
                    sales: response.data
            })
            
        })
    }
    componentDidMount(){
        this.getUserInfo()
        this.getUserSales()
    }
    render() {
        console.log("state",this.state)
        console.log("props?",this.props)
        let data;
        if(this.state.sales){
            data = this.state.sales.map((e, i) => {
                return (
                    <SaleHistory key={i} data={e} />
                )
            })
        }
        return (
            <div>
                <div>
                    <div>{this.state.person.user_img}</div>
                    <div>profile info
                        <div> name {this.state.person.user_name}</div>
                        <div> address st {this.state.person.address_street} </div>
                        <div>
                            <div> address city{this.state.person.address_city} </div>
                            <div> state{this.state.person.address_state} </div>
                            <div> zip{this.state.person.address_zip} </div>
                        </div>
                        <button onClick={this.editProfileButtonClicked}>update profile</button>
                    </div>
                </div>
                <button onClick={this.saleButtonClicked}>sale button</button>
                {/* <SaleHistory /> */}
                {data}
                {/* <Footer /> */}
            </div>
        );
    }
}

function mapStateToProps(state) { return state }
export default connect(mapStateToProps, {})(ProfileView);