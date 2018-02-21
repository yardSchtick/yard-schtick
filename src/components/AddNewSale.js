import React, { Component } from 'react';
import Footer from '../components/Footer/Footer';
import {Link} from 'react-router-dom';

class AddNewSale extends Component {
  constructor() {
    super()

    this.state = {
      start_time: null,
      end_time: null,
      sale_date: null,
      sale_desc: null,
      count: 300,
      button: true,
      show: false,
      warning: 'Please Fillout the Form Completely'
    }
  }

  componentDidMount() {
    var {start_time,end_time,sale_date,sale_desc,count} = this.state

    if (!start_time) {this.setState({button: false})}
    if (!end_time) {this.setState({button: false})}
    if (!sale_date) {this.setState({button: false})}
    if (!sale_desc) {this.setState({button: false})}
    if (count < 0) {this.setState({button: false})}
  }

  handleDec = (e) => {
    var num = 300 - e.split('').length
    this.setState({ sale_desc: e, count: num })
  }

  handleChange = (e, input) => {
    if (input === 'start') {
      this.setState({start_time: e})
    } else if (input === 'end') {
      this.setState({end_time: e})
    } else if (input === 'date') {
      this.setState({sale_date: e})
    }
    this.setState({button: true})
  }

  buttons = () => {
    if (this.state.button) {
      return <Link to='/AddInventory'><button>Submit</button></Link>
    } else {
      return <button onClick={_=>this.setState({show: true})}>Submit</button>
    }
  }

  showWarning = () => {
    if (this.state.show) {
      return <p>Please Fill Out Entire Form</p>
    }
    return <div></div>
  }


  render() {

    return (
      <div >  
        <h1>Sale Information</h1>
        <p>Start Time</p>
        <input type='time' id='starttime' 
          onBlur={e=>this.handleChange(e.target.value, 'start')}/>
        <p>End Time</p> 
        <input type='time' 
          onBlur={e=>this.handleChange(e.target.value, 'end')}/>        
        <p>Date</p>
        <input type='date'
          onBlur={e=>this.handleChange(e.target.value, 'date')}/>        
        <p>Description:</p>
        <input placeholder="This should be a general overview of what you're selling" 
          onChange={e => this.handleDec(e.target.value)} />
        <p>Characters Left: {this.state.count}</p>
         {this.buttons()}
        {this.showWarning()} 
      </div>
    );
  }
}

export default AddNewSale;