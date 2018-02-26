import React, { Component } from 'react';
import Footer from '../components/Footer/Footer';
import { connect } from 'react-redux';
import { GETURL } from '../Duck/redux';
import {Link} from 'react-router-dom'
import axios from 'axios';

class AddInventory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inv_name : null,
      inv_desc : null,
      inv_price: '0.00',
      count: 300
    }
    this.addItem = this.addItem.bind(this);
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
  addItem(){
    axios({
      url:'/api/newInventory',
      method:'post',
      data:{
        inv_name:this.state.inv_name, 
        inv_picture: null, 
        inv_desc:this.state.inv_desc, 
        inv_price:this.state.inv_price,
        sale_id: this.props.user.id
      }
    }).then ((response) =>{
      console.log(response)
    }).catch(( error ) => {
      console.log(error)
    })
  }
  render() {
    console.log("look here for user",this.props)
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
        <Link to="/InventoryList"><button onClick={this.addItem}>Add Item</button></Link>
      </div>
    );
  }
}

function mapStateToProps(state) { return {
  url: state.url,
  user: state.user
}}

export default connect(mapStateToProps, { GETURL })(AddInventory);