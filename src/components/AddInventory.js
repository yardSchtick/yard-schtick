import React, { Component } from 'react';
import Footer from '../components/Footer/Footer';
import { connect } from 'react-redux';
import { GETURL } from '../Duck/redux';
import {Link} from 'react-router-dom'

class AddInventory extends Component {
  constructor() {
    super()

    this.state = {
      inv_name : null,
      inv_desc : null,
      inv_price: '0.00',
      count: 300
    }
  }

  componentDidMount() {
    this.props.GETURL(this.props.match.url)
  }

  handleInput = (e,input) => {
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

  render() {
    return (
      <div >
        <h2>Add Item to Sale</h2>
        <p>Item Name</p>
        <input 
          onBlur={e=>this.handleInput(e.target.value,'name')}/>
        <p>Picture</p>
        <div className="itemPic"></div>
        <p>Item Description</p>
        <input 
          onChange={e => this.handleDec(e.target.value)} />    
        <p>Character's Left: {this.state.count}</p>    
        <p>Price</p>
        <input type="number" placeholder={this.state.inv_price}
          onBlur={e=>this.handleInput(e.target.value,'price')}/>        
        <Link to="/InventoryList"><button>Add Item</button></Link>
      </div>
    );
  }
}

function mapStateToProps(state) { return {
  url: state.url
}}

export default connect(mapStateToProps, { GETURL })(AddInventory);