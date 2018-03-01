import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { GETURL, GETUSER, getUserSales } from '../../Duck/redux';
import SaleHistory from './../SaleHistory/SaleHistory';
import { Link } from 'react-router-dom'
import EditProfile from './EditProfile'
import UserInfo from './UserInfo'

class ProfileView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sales: [],
            saved: [],
            edit: false
        }
        this.getUserSales = this.getUserSales.bind(this);
        this.toggleEditShow = this.toggleEditShow.bind(this)
    }

    componentDidMount() {
        this.props.GETUSER().then(() => {
            axios.get(`/api/getUserSales/${this.props.user.id}`).then(response => {
                this.setState({ sales: response.data })
                this.props.getUserSales(response.data)
            })
        })
        this.props.GETURL(this.props.match.url)
    }


    getUserSales() {
        axios.get(`/api/getUserSales/${this.props.user ? this.props.user.id : ''}`).then(response => {
            this.setState({ sales: response.data })
        })
    }

    toggleEditShow() {
        this.setState({ edit: !this.state.edit })
    }

    render() {
       
        let show = <UserInfo
            user={this.props.user}
            toggleEditShow={this.toggleEditShow} />

        if (this.state.edit) {
            show = <EditProfile
                user={this.props.user}
                toggleEditShow={this.toggleEditShow} />
        }

        return (
            <div>
                {show}

                <div className="profileButtonContainer">
                    <Link to='/AddNewSale'><button id="profileAddSaleButton">Add Sale</button></Link>
                </div>

                <div className="saleDisplay">
                    <h1 id="userName">Sale History</h1>
                    <div className="dataDisplay">
                    <SaleHistory />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        url: state.url,
        user: state.user,
        sales: state.sales,
        userSales: state.userSales
    }
}
export default connect(mapStateToProps, { GETURL, GETUSER, getUserSales })(ProfileView);