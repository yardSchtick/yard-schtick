import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { GETURL, ADDNEWSALE } from '../Duck/redux';

class AddNewSale extends Component {
  constructor() {
    super()

    this.state = {
      start_time: null,
      end_time: null,
      start_date: null,
      end_date: null,
      button: false,
      show: false,
      warning: 'Please Fillout the Form Completely'
    }
  }

  componentDidMount() {
    this.props.GETURL(this.props.match.url)
  }
  
  setButton = () => {
    var { start_time, end_time, start_date, sale_desc, count, end_date } = this.state
  
    if (!start_time || start_time == '') 
      { this.setState({ button: false }) 
    } else if (!end_time || end_time == '') 
      { this.setState({ button: false }) 
    } else if (!start_date || start_date == '') 
      { this.setState({ button: false }) 
    } else if (!end_date || end_date == '') 
      { this.setState({ button: false }) 
    } else (this.setState({button: true}))
    
  }

  handleChange = (e, input) => {
    if (input === 'start') {
      this.setState({ start_time: e })
    } else if (input === 'end') {
      this.setState({ end_time: e })
    } else if (input === 'start date') {
      this.setState({ start_date: e })
    } else if (input === 'end date') {
      this.setState({ end_date: e })
    }
    this.setButton()
  }

  setNewSale = () => {
    var { start_time, end_time, start_date, end_date } = this.state

    this.props.ADDNEWSALE({start_time, end_time, start_date, end_date})
  }

  buttons = () => {
    if (this.state.button) {
      return <Link to='/SaleDescription'><button onClick={this.setNewSale}>Submit</button></Link>
    } else {
      return <button onClick={_ => this.setState({ show: true })}>Submit</button>
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
        <h1>Sale Time</h1>
        <p>Start Time</p>
        <input type='time' id='starttime'
          onChange={e => this.handleChange(e.target.value, 'start')} />
        <p>End Time</p>
        <input type='time'
          onChange={e => this.handleChange(e.target.value, 'end')} />
        <p>Start Date</p>
        <input type='date'
          onChange={e => this.handleChange(e.target.value, 'start date')} />
        <p>End Date</p>
        <input type='date'
          onChange={e => this.handleChange(e.target.value, 'end date')} />
        
        {this.buttons()}
        {this.showWarning()}
      </div>
    );
  }
}

function mapStateToProps(state) { return {}}

export default connect(mapStateToProps, { GETURL, ADDNEWSALE })(AddNewSale);