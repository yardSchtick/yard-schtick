import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GETURL, EDITSALE } from '../../Duck/redux';
import {Link} from 'react-router-dom'
import axios from "axios"

class SaleHistory extends Component {
    constructor(props){
        super(props)
        
        this.editSaleClick = this.editSaleClick.bind(this)
        this.deleteClick = this.deleteClick.bind(this)
        this.deleteSale = this.deleteSale.bind(this)
        this.editSale = this.editSale.bind(this)

    }
    
    editSaleClick(){
        console.log("edit button clicked")
    }
    deleteClick(){
        this.deleteSale()
        console.log("delete clicked",this.props)
        
    }
    deleteSale(){
        axios({
            url:`/api/deleteSale/${this.props.data.id}`,
            method:'delete'
        }).then((response) =>{
            console.log(`sale with id of ${this.props.data.id} should be removed`)
            console.log(response)
            this.props.reget()
        })
    }
    editSale(){
        
    }
    render() {
        console.log('sale history check me',this.props.data)
        return (
            <div>
                <div>sale history
                    <div>
                        <div>{this.props.data.sale_name}</div>
                        <div>old date{this.props.data.end_date}</div>
                        <Link to ="/AddNewSale" >
                        <button onClick={ ()=>this.props.EDITSALE(this.props.data)}>Edit Sale</button>
                        </Link>
                        <button onClick={this.deleteClick}>delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) { return {}}

export default connect(mapStateToProps, { GETURL, EDITSALE })(SaleHistory)