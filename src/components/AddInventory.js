import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GETURL, clearInventory, LOGINOUT } from '../Duck/redux';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Dropzone from 'react-dropzone'

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
        inv_picture: this.state.inv_picture,
        inv_desc: this.state.inv_desc,
        inv_price: this.state.inv_price,
        sale_id: this.props.newSale.id
      }
    }).then((response) => {
      this.props.clearInventory()
      this.props.history.push('/InventoryList')
      console.log(response)
    }).catch((error) => {
    })
  }

  handleDrop = files => {
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `yardschtick`);
      formData.append("upload_preset", "xaytd9ya"); 
      formData.append("api_key", "744751991133399");
      // formData.append("unique_filename", "true");
      
      
      return axios.post("https://api.cloudinary.com/v1_1/dqval3kpy/image/upload", formData)
      .then(response => {
        const data = response.data;
        const fileURL = data.secure_url         // You should store this URL for future references in your app
        this.setState({ inv_picture: fileURL })    //change sale_img to inv_picture
        
      })
    });
  
    // Once all the files are uploaded 
    axios.all(uploaders).then(() => {
      alert('image was uploaded')
    });
  }



  render() {
    if (!this.props.loggedin) {
      return <Redirect to='/Login' />
  }

    return (
      <div className="addItemSaleContainer">
        <h1>Add Item to Sale</h1>
        <label className="addItemSale">Item Name</label>
        <input className="addItemSale"
          placeholder={this.props.inventory ? this.state.inv_name : ''}
          onBlur={e => this.handleInput(e.target.value, 'name')} />
        <p className="addItemSale">Picture</p>
        <div >
            <Dropzone className="itemPic" onDrop={ this.handleDrop } multiple accept="image/*">
                        <div className="glyphicon glyphicon-upload">
                            <p className="uploaderText">Click to Upload</p>
                        </div>
            </Dropzone></div>
        <label className="addItemSale">Item Description</label>
        <input className="addItemSale"
          placeholder={this.props.inventory ? this.state.inv_desc : ''}
          onChange={e => this.handleDec(e.target.value)} />
        <p className="addItemSale">Character's Left: {this.state.count}</p>
        <br /><br />
        <label className="addItemSale">Price</label>
        <input className="addItemSale" type="number" placeholder={this.state.inv_price}
          placeholder={this.props.inventory ? this.state.inv_price : ''}
          onBlur={e => this.handleInput(e.target.value, 'price')} />
        <div className="addItemButtonContainer">
          <button className="addItemsButton" onClick={this.addItem}>Add Item</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    url: state.url,
    user: state.user,
    newSale: state.newSale,
    inventory: state.inventory,
    loggedin: state.loggedin
  }
}

export default connect(mapStateToProps, { GETURL, clearInventory, LOGINOUT })(AddInventory);