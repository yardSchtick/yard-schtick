import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GETURL, EDITSALE, SETSALE } from '../../Duck/redux';
import { Link } from 'react-router-dom'
import axios from "axios"

class SaleHistory extends Component {
    constructor() {
        super()

        this.state = {
            date: ''
        }
    }

    componentDidMount() {
        this.formatDate()
    }

    deleteClick = () => {
        axios.delete(`/api/deleteSale/${this.props.data.id}`).then(res => {
            this.props.SETSALE(res.data)
        })
    }

    formatDate = () => {
        var tempArr1 = []
        var tempArr2 = []
        var tempDate = this.props.data.start_date.substring(0, 10).split('-').reverse()
        tempArr1[0] = tempDate[1]
        tempArr1[1] = tempDate[0]
        tempArr1[2] = tempDate[2]
        this.setState({ date: tempArr1.join('/') })
    }

    render() {
        return (
            <div className="saleInfo">
                <h2 id="item">{this.state.date}</h2>
                <div className="saleInfoButtons">
                    <Link to="/AddNewSale" >
                        <button id="itemButton" onClick={() => this.props.EDITSALE(this.props.data)}>Edit</button>
                    </Link>
                    <button id="itemButton" onClick={this.deleteClick}>Delete</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) { return {} }

export default connect(mapStateToProps, { GETURL, EDITSALE, SETSALE })(SaleHistory)