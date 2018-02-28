import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GETURL, ADDNEWSALE } from '../Duck/redux';
import AddNewSaleButton from './AddNewSaleButton'

class AddNewSale extends Component {
  constructor() {
    super()

    this.state = {
      start_time: '',
      end_time: '',
      start_date: '',
      end_date: '',
      button: false
    }
  }

  componentDidMount() {
    this.props.GETURL(this.props.match.url)

    if (this.props.newSale) {
      var { newSale } = this.props

      this.setState({
        start_time: newSale.start_time,
        end_time: newSale.end_time,
        start_date: newSale.start_date.substring(0, 10),
        end_date: newSale.end_date.substring(0, 10)
      },
        _ => {
          this.setButton()
        })
    }
  }

  setButton = () => {
    var { start_time, end_time, start_date, end_date } = this.state

    if (!start_time || start_time === '') {
      this.setState({ button: false })
    } else if (!end_time || end_time === '') {
      this.setState({ button: false })
    } else if (!start_date || start_date === '') {
      this.setState({ button: false })
    } else if (!end_date || end_date === '') {
      this.setState({ button: false })
    } else {
      this.setState({ button: true, show: false })
    }
  }

  handleChange = (e, input) => {
    if (input === 'start') {
      this.setState({ start_time: e }, _ => this.setButton())
    } else if (input === 'end') {
      this.setState({ end_time: e }, _ => this.setButton())
    } else if (input === 'start date') {
      this.setState({ start_date: e }, _ => this.setButton())
    } else if (input === 'end date') {
      this.setState({ end_date: e }, _ => this.setButton())
    }

  }

  render() {

    return (
      <div >
        <h1 className="title">Sale Time</h1>

        <div className="inputContainer">
          <div className="inputIndividualContainer">
            <p>Start Time:</p>
            <input type='time'
              id="smallInput"
              value={this.state.start_time ? this.state.start_time : ''}
              onChange={e => this.handleChange(e.target.value, 'start')} />
          </div>

          <div className="inputIndividualContainer">
            <p>End Time:</p>
            <input type='time'
              id="smallInput"
              value={this.state.end_time ? this.state.end_time : ''}
              onChange={e => this.handleChange(e.target.value, 'end')} />
          </div>

          <div className="inputIndividualContainer">
            <p>Start Date:</p>
            <input type='date'
              id="smallInput"
              value={this.state.start_date ? this.state.start_date : ''}
              onChange={e => this.handleChange(e.target.value, 'start date')} />
          </div>
          
          <div className="inputIndividualContainer">
            <p>End Date:</p>
            <input type='date'
              id="smallInput"
              value={this.state.end_date ? this.state.end_date : ''}
              onChange={e => this.handleChange(e.target.value, 'end date')} />
          </div>
        </div>
        
        <AddNewSaleButton
          button={this.state.button}
          show={this.state.show}
          start_time={this.state.start_time}
          end_time={this.state.end_time}
          start_date={this.state.start_date}
          end_date={this.state.end_date} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newSale: state.newSale
  }
}

export default connect(mapStateToProps, { GETURL, ADDNEWSALE })(AddNewSale);