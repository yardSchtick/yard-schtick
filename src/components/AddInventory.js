import React, { Component } from 'react';
import Footer from '../components/Footer/Footer';
import { connect } from 'react-redux';
import { GETURL, clearInventory } from '../Duck/redux';
import { Link } from 'react-router-dom'
import axios from 'axios';

class AddInventory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inv_name: null,
      inv_desc: null,
      inv_price: '0.00',
      count: 300
    }
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    if (this.props.inventory) {
      this.setState({
        inv_name: this.props.inventory.inv_name,
        inv_desc: this.props.inventory.inv_desc,
        inv_price: this.props.inventory.inv_price
      })
    }
    this.props.GETURL(this.props.match.url)
  }

  handleInput = (e, input) => {
    if (input === 'name') {
      this.setState({ inv_name: e })
    } else if (input === 'price') {
      this.setState({ inv_price: e })
    }
  }

  handleDec = (e) => {
    var num = 300 - e.split('').length
    this.setState({ inv_desc: e, count: num })
  }
  addItem() {
    if (this.props.inventory.id) {
      axios({
        url: `/api/deleteOneInv/${this.props.inventory.id}`,
        method: 'delete',
      }).then((response) => {
      })
    }
    axios({
      url: '/api/newInventory',
      method: 'post',
      data: {
        inv_name: this.state.inv_name,
        inv_picture: null,
        inv_desc: this.state.inv_desc,
        inv_price: this.state.inv_price,
        sale_id: this.props.newSale.id
      }
    }).then((response) => {
      this.props.clearInventory()
      this.props.history.push('/InventoryList')
    }).catch((error) => {
    })
  }
  render() {
    return (
      <div >
        <h2>Add Item to Sale</h2>
        <p>Item Name</p>
        <input
          placeholder={this.props.inventory ? this.state.inv_name : ''}
          onBlur={e => this.handleInput(e.target.value, 'name')} />
        <p>Picture</p>
        <div className="itemPic"></div>
        <p>Item Description</p>
        <input
          placeholder={this.props.inventory ? this.state.inv_desc : ''}
          onChange={e => this.handleDec(e.target.value)} />
        <p>Character's Left: {this.state.count}</p>
        <p>Price</p>
        <input type="number" placeholder={this.state.inv_price}
          placeholder={this.props.inventory ? this.state.inv_price : ''}
          onBlur={e => this.handleInput(e.target.value, 'price')} />
        <button onClick={this.addItem}>Add Item</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    url: state.url,
    user: state.user,
    newSale: state.newSale,
    inventory: state.inventory
  }
}

export default connect(mapStateToProps, { GETURL, clearInventory })(AddInventory);