import React, { Component } from 'react';
import axios from 'axios';
import Footer from '../components/Footer/Footer';
import { connect } from 'react-redux';
import { GETURL } from '../Duck/redux';



class InventoryList extends Component {

    constructor() {
        super()
        this.state = {
            inventory: null
        }
    }

    componentWillMount() {
        axios.get('/api/getInventory/1')
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
        this.props.GETURL(this.props.match.url)
    }

    componentDidMount() {
        this.props.GETURL(this.props.match.url)
    }

    render() {
        console.log(this.state.inventory)

        if (this.state.inventory) {
            var InventoryCard = this.state.inventory.map((val, index) => (

                <div key={index}>
                    <p>{val.inv_name}</p>
                    {/* <img src={val.inv_picture}/> */}
                    <p>{val.inv_desc}</p>
                    <p>{val.inv_price}</p>
                </div>
            ))
        }

        return (
            <div>
                {InventoryCard}
            </div>
        )
    }
}

function mapStateToProps(state) { }

export default connect(mapStateToProps, { GETURL })(InventoryList)

