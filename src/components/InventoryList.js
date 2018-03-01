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
    removeInv(id){
        axios({
            url:`/api/deleteOneInv/${id}`,
            method:'delete',
        }).then((response) =>{
            this.getInv();
        })
    }
    getInv(){
        axios.get(`/api/getInventory/${ this.props.newSale ? this.props.newSale.id :null}`)
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

                <div key={index}>
                    <p>{val.inv_name}</p>
                    {/* <img src={val.inv_picture}/> */}
                    <p>{val.inv_desc}</p>
                    <p>{val.inv_price}</p>
                    <Link to='/AddInventory'><button onClick={() => this.props.getOneInventory(val)}>Edit</button></Link>
                    <button onClick={() => this.removeInv(val.id)}>Remove</button>
                </div>
            ))
        }

        return (
            <div>
                {InventoryCard}
                <Link to='/AddInventory'><button> Add an Item</button></Link>
                <Link to="/ProfileView"> <button onClick={this.props.CLEARSALE}>Finished Adding Items</button> </Link>
            </div>
        )
    }
}

function mapStateToProps(state) {return {
    user: state.user,
    newSale: state.newSale
} }

export default connect(mapStateToProps, { GETURL, CLEARSALE, getOneInventory })(InventoryList)

