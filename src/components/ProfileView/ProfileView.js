import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import {GETURL, GETUSER} from '../../Duck/redux';
import SaleHistory from './../SaleHistory/SaleHistory';
import { Link } from 'react-router-dom';
import './ProfileView.css'

class ProfileView extends Component {
    constructor(props){
        super(props)

        this.state = {
            person:{},
            sales:[],
            saved:[]
        }

        this.editProfileButtonClicked = this.editProfileButtonClicked.bind(this);
        this.saleButtonClicked = this.saleButtonClicked.bind(this);
        this.getUserSales = this.getUserSales.bind(this);
    }
    saleButtonClicked(){
        console.log("sale button was clicked")
    }
    editProfileButtonClicked(){
        console.log("edit profile button was clicked")
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
        this.props.GETUSER()
        this.getUserSales()
        this.props.GETURL(this.props.match.url)
    }
    
    render() {
        console.log("state",this.state,this.props)
        console.log("props?",)
        let data;
        if(this.state.sales){
            data = this.state.sales.map((e, i) => {
                return (
                    <SaleHistory key={i} data={e} reget={this.getUserSales}/>
                )
            })
        }
        return (
            <div>
                <div>
                    <div className = "userPic" style = {{backgroundImage: `url('${!this.props.user ? '' : this.props.user.user_img}')` }}></div>
                    <div>profile info
                        <div> name {!this.props.user ? '' : this.props.user.user_name}</div>
                        <div> address st {!this.props.user ? '' : this.props.user.address_street} </div>
                        <div>
                            <div> address city{!this.props.user ? '' : this.props.user.address_city} </div>
                            <div> state{!this.props.user ? '' : this.props.user.address_state} </div>
                            <div> zip{!this.props.user ? '' : this.props.user.address_zip} </div>
                        </div>
                        <button onClick={this.editProfileButtonClicked}>
                            <Link to = '/EditProfile' style={{ textDecoration: 'none', color: '#000000' }}>
                                update profile
                            </Link>
                        </button>
                    </div>
                </div>
                <button onClick={this.saleButtonClicked}>
                    <Link to = '/AddNewSale' style={{ textDecoration: 'none', color: '#000000' }}>
                        sale button
                    </Link>
                </button>
                {/* <SaleHistory /> */}
                {data}
                {/* <Footer /> */}
            </div>
        );
    }
}

function mapStateToProps(state) { 
    return {
        url: state.url,
        user: state.user
    }
}
export default connect(mapStateToProps, {GETURL, GETUSER})(ProfileView);