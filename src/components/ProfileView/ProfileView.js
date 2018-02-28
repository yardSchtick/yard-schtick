import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { GETURL, GETUSER } from '../../Duck/redux';
import SaleHistory from './../SaleHistory/SaleHistory';
import { Link } from 'react-router-dom'
import EditProfile from './EditProfile'
import UserInfo from './UserInfo'

class ProfileView extends Component {
    constructor() {
        super()

        this.state = {
            sales: [],
            saved: [],
            edit: false
        }
        this.getUserSales = this.getUserSales.bind(this);
        this.toggleEditShow = this.toggleEditShow.bind(this)
    }

    componentDidMount() {
        this.props.GETUSER()
        this.getUserSales()
        this.props.GETURL(this.props.match.url)
    }

    componentWillReceiveProps() {
        this.getUserSales()
        this.props.GETUSER()
    }

    getUserSales() {
        axios.get('/api/getUserSales').then(response => {
            console.log("this guy",response)
            this.setState({ sales: response.data })
        })
    }

    toggleEditShow () {
        this.setState({edit: !this.state.edit})
    }

    render() {
        let data;
        let show = <UserInfo 
                        user={this.props.user}
                        toggleEditShow={this.toggleEditShow}/>

        if (this.state.sales) {
            data = this.state.sales.map((e, i) => {
                return (
                    <SaleHistory key={i} data={e} reget={this.getUserSales} />
                )
            })
        }

        if(this.state.edit) {
            show = <EditProfile
                        user={this.props.user}
                        toggleEditShow={this.toggleEditShow}/>      
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
                        {data}
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
        sales: state.sales
    }
}
export default connect(mapStateToProps, { GETURL, GETUSER })(ProfileView);