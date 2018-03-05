import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { GETURL, CLEARSALE, getOneInventory } from '../Duck/redux';
import { Link } from 'react-router-dom';



class InventoryList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inventory: null
        }
        this.removeInv = this.removeInv.bind(this)
        this.getInv = this.getInv.bind(this)
    }
    removeInv(id) {
        axios({
            url: `/api/deleteOneInv/${id}`,
            method: 'delete',
        }).then((response) => {
            this.getInv();
        })
    }
    getInv() {
        axios.get(`/api/getInventory/${this.props.newSale ? this.props.newSale.id : null}`)
            .then((response) => {
                this.setState(
                    { inventory: response.data }
                )
            }
            )
            .catch(function (error) {
                console.log(error);
            })
        console.log(this.props.match.url)
    }
    componentWillMount() {
        this.getInv()
    }

    componentDidMount() {
        this.props.GETURL(this.props.match.url)

    }

    render() {

        if (this.state.inventory) {
            var InventoryCard = this.state.inventory.map((val, index) => (

                <div className="inventoryCard" key={index}>
                    <h2 className="inventoryCardLineItem">{val.inv_name}</h2>
                    <p className="inventoryCardLineItem"><span>Price: </span>${val.inv_price}</p>
                    <img src={val.inv_picture} />
                    <p className="inventoryCardLineItem"><span>Desc: </span>{val.inv_desc}</p>
                    <div className="inventoryCardButtonContainer">
                        <Link to='/AddInventory'><button onClick={() => this.props.getOneInventory(val)}>Edit</button></Link>
                        <button onClick={() => this.removeInv(val.id)}>Remove</button>
                    </div>
                </div>
            ))
        }

        return (
            <div>
                <div className="inventoryCardContainer">
                    {InventoryCard}
                </div>
                <div className="inventoryListContainer">
                    <Link to='/AddInventory'><button className="inventoryListButton"> Add an Item</button></Link>
                    <Link to="/ProfileView"> <button className="inventoryListButton2" onClick={this.props.CLEARSALE}>Done Adding Items</button> </Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        newSale: state.newSale
    }
}

export default connect(mapStateToProps, { GETURL, CLEARSALE, getOneInventory })(InventoryList)

