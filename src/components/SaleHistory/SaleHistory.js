import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GETURL, EDITSALE, SETSALE } from '../../Duck/redux';
import {Link} from 'react-router-dom'
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
        axios.delete(`/api/deleteSale/${this.props.data.id}`).then(res =>{
            this.props.SETSALE(res.data)
        })
    }

    formatDate = () => {
        var tempArr1 = []
        var tempArr2 = []
        var tempDate = this.props.data.start_date.substring(0,10).split('-').reverse()
        tempArr1[0] = tempDate[1]
        tempArr1[1] = tempDate[0]
        tempArr1[2] = tempDate[2]
        tempDate = this.props.data.end_date.substring(0,10).split('-').reverse()
        tempArr2[0] = tempDate[1]
        tempArr2[1] = tempDate[0]
        tempArr2[2] = tempDate[2]
        var finalArr = tempArr1.join('/') + ' - ' + tempArr2.join('/')
        this.setState({ date: finalArr })
      }

    render() {
        return (
            <div>
                <div>sale history
                    <div>
                        <div>{this.props.data.sale_name}</div>
                        <div>{this.state.date}</div>
                        <Link to ="/AddNewSale" >
                        <button onClick={ ()=>this.props.EDITSALE(this.props.data)}>Edit Sale</button>
                        </Link>
                        <button onClick={this.deleteClick}>Delete Sale</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) { return {}}

export default connect(mapStateToProps, { GETURL, EDITSALE, SETSALE })(SaleHistory)