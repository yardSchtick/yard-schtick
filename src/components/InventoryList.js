import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { GETURL, CLEARSALE, getOneInventory } from '../Duck/redux';
import { Link, Redirect } from 'react-router-dom';

class InventoryList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inventory: null
        }
        this.removeInv = this.removeInv.bind(this)
        this.getInv = this.getInv.bind(this)
    }

    componentWillMount() {
        this.getInv()
        this.props.GETURL(this.props.match.url)
    }

    removeInv(id) {
        axios.delete(`/api/deleteOneInv/${id}`).then((response) => {
            this.getInv();
        })
    }

    // ===========================================
    getInv() {
        axios.get(`/api/getInventory/${this.props.newSale ? this.props.newSale.id : null}`)
        .then(r => {
                this.setState({ inventory: r.data.sort((a,b) => a.inv_name.toUpperCase() > b.inv_name.toUpperCase()) })
            })
    }

    render() {
        if (!this.props.loggedin) {
            return <Redirect to='/Login' />
        }

        if (this.state.inventory) {
            var InventoryCard = this.state.inventory.map((val, index, arr) => (

                <div className="inventoryCard" key={val.id} id={index === arr.length-1 ? 'lastCard' : 'cardBorder'}>
                    <h2 className="inventoryCardLineItem">{val.inv_name}</h2>
                    <p className="inventoryCardLineItem"><span>Price: </span>${val.inv_price}</p>
                    {/* <img src={val.inv_picture} alt='inventory item'/> */}
                    <p className="inventoryCardLineItem invenDesc"><span>Desc: </span>{val.inv_desc}</p>
                    <div className="inventoryCardButtonContainer">
                        <Link to='/AddInventory'><button onClick={() => this.props.getOneInventory(val)}>Edit</button></Link>
                        <button onClick={() => this.removeInv(val.id)}>Remove</button>
                    </div>
                </div>
            ))
        }

        return (
            <div className='inventoryListOuter'>
                <div className="inventoryCardContainer">
                    {InventoryCard}
                </div>
                <div className="inventoryListContainer">
                    <Link to='/AddInventory'><button className="inventoryListButton">Add an Item</button></Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        newSale: state.newSale,
        loggedin: state.loggedin
    }
}

export default connect(mapStateToProps, { GETURL, CLEARSALE, getOneInventory })(InventoryList)

