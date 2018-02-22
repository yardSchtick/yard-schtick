import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GETURL } from '../../Duck/redux';
import axios from "axios"

class SaleHistory extends Component {
    constructor(props){
        super(props)
        
        this.editSaleClick = this.editSaleClick.bind(this)
        this.deleteClick = this.deleteClick.bind(this)
        this.deleteSale = this.deleteSale.bind(this)
        this.deleteInv = this.deleteInv.bind(this)

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
    deleteInv(){
        axios({
            url:'',
            method:'delete'
        }).then((resopnse) =>{
            console.log("delete inv worked")
            this.deleteSale()
        })
    }
    render() {
        console.log('sale history check me',this.props.data)
        return (
            <div>
                <div>sale history
                    <div>
                        <div>{this.props.data.sale_name}</div>
                        <div>old date{this.props.data.end_date}</div>
                        <button onClick={this.editSaleClick}>Edit Sale</button>
                        <button onClick={this.deleteClick}>delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) { return {}}

export default connect(mapStateToProps, { GETURL })(SaleHistory)