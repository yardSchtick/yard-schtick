import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GETURL, EDITSALE, SETSALE, getUserSales } from '../../Duck/redux';
import { Link } from 'react-router-dom'
import axios from "axios"

class SaleHistory extends Component {
    constructor() {
        super()

        this.state = {
            date: ''
        }
    }
    componentWillReceiveProps(){
        if (this.props.userSales.start_date) {
            this.formatDate()
        }
    }

    componentDidMount() {
        if (this.props.userSales.start_date) {
            this.formatDate()
        }
    }

    deleteClick(id) {
        axios.delete(`/api/deleteSale/${id}`).then(res => {
            this.props.getUserSales(res.data);            
        })
    }

    formatDate = (date) => {
        var tempArr1 = []
        var tempDate = date.substring(0, 10).split('-').reverse()
        tempArr1[0] = tempDate[1]
        tempArr1[1] = tempDate[0]
        tempArr1[2] = tempDate[2]
        return tempArr1.join('/') 
    }

    render() {
        const data = this.props.userSales.map((e, i) => {
            var time = this.formatDate(e.start_date)
            return (<div key={i} className="saleInfo">
                <h2 id="item" onClick={() => this.props.EDITSALE(this.props.userSales[i])}><Link to="/InventoryList">{time}</Link></h2>
                <div className="saleInfoButtons">
                    <Link to="/AddNewSale" >
                        <button id="itemButton" onClick={() => this.props.EDITSALE(e)}>Edit</button>
                    </Link>
                    <button id="itemButton" onClick={() => this.deleteClick(e.id)}>Delete</button>
                </div>
            </div>
            )

        })
        return (
            <div>
                {data}
            </div>
        )
    }
}

function mapStateToProps(state) { return {
    userSales: state.userSales,
    user: state.user
} }

export default connect(mapStateToProps, { GETURL, EDITSALE, SETSALE, getUserSales})(SaleHistory)