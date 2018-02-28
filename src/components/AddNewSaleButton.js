import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ADDNEWSALE } from '../Duck/redux';
import { Link } from 'react-router-dom'

class AddNewSaleButton extends Component {
    constructor() {
        super()

        this.state = {
            show: false,
            warning: 'Please Fillout the Form Completely'
        }
    }

    setNewSale = () => {
        var { start_time, end_time, start_date, end_date } = this.props

        this.props.ADDNEWSALE({ start_time, end_time, start_date, end_date })
    }

    showWarning = () => {
        if (this.state.show) {
            return <p>Please Fill Out Entire Form</p>
        }
        return <div></div>
    }

    buttons = () => {
        if (this.props.button) {
            return <Link to='/SaleDescription'><button id="submitSaleBtn" onClick={this.setNewSale}>Submit</button></Link>
        } else {
            return <button id="submitSaleBtn" onClick={_ => this.setState({ show: true })}>Submit</button>
        }
    }

    render() {

        return (
            <div id="submitButton">
                {this.buttons()}
                {this.showWarning()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        newSale: state.newSale
    }
}

export default connect(mapStateToProps, { ADDNEWSALE })(AddNewSaleButton);