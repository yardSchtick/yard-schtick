import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GETURL, EDITSALE, SETSALE, getUserSales } from '../../Duck/redux';
import { Link } from 'react-router-dom'
import axios from "axios"

class SaleHistory extends Component {
    constructor() {
        super()

        this.state = {
            date: '',
            longList: false
        }
    }
    componentWillReceiveProps() {
        if (this.props.userSales.start_date) {
            this.formatDate()
        }
    }
    
    componentDidUpdate() {
        if (document.getElementsByClassName('dataDisplay')[0].clientHeight > 235 && !this.state.longList ) {
            this.setState({longList: true})
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
        var tempDate = date.substring(0, 10).split('-')
        var month ='';
        switch (tempDate[1]) {
            case "01":
                month = 'Jan'
                break
            case "02":
                month = 'Feb'
                break
            case "03":
                month = 'Mar'
                break
            case "04":
                month = 'Apr'
                break
            case "05":
                month = 'May'
                break
            case "06":
                month = 'Jun'
                break
            case "07":
                month = 'Jul'
                break
            case "08":
                month = 'Aug'
                break
            case "09":
                month = 'Sep'
                break
            case "10":
                month = 'Oct'
                break
            case "11":
                month = 'Nov'
                break
            default:
                month = 'Dec'
        }
        return `${month} ${tempDate[2]}, ${tempDate[0]}`
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
            <div className="dataDisplay" id={this.state.longList ? 'longList' : ''}>
                {data}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userSales: state.userSales,
        user: state.user
    }
}

export default connect(mapStateToProps, { GETURL, EDITSALE, SETSALE, getUserSales })(SaleHistory)