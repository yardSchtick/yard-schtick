import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { CLEARSALE, LOGINOUT } from '../../Duck/redux'

class Footer extends Component {
    constructor() {
        super()

        this.state = {
            showMap: null,
            buttonShow: null
        }
    }

    componentWillUnmount() {
        this.props.LOGINOUT(false)
    }

    render() {

        var { url } = this.props
        var leftDisplay = null
        var rightDisplay = null

        if (url !== '/SaleList' && url !== '/MapView') {
            leftDisplay = <Link to='/MapView'><button className="leftButton" id="navButton">Map</button></Link>
        } else if (url !== '/SaleList') {
            leftDisplay = <Link to='/SaleList'><button className="leftButton" id="navButton">List</button></Link>
        } else {
            leftDisplay = <Link to='/MapView'><button className="leftButton" id="navButton">Map</button></Link>
        }

        if (this.props.user) {
            if (url === '/ProfileView') {
                rightDisplay = <a href={`${process.env.REACT_APP_LOGOUT}`}><button className="rightButton" id="navButton">Log Out</button></a>
            } else if (url === '/AddInventory') {
                rightDisplay = <Link to='/InventoryList'><button className="rightButton" id="navButton">Back</button></Link>
            } else if (url === '/InventoryList') {
                rightDisplay = <Link to='/ProfileView'><button className="rightButton" id="navButton">Profile</button></Link>
            } else if (url === '/SaleDescription') {
                rightDisplay = <Link to='/AddNewSale'><button className="rightButton" id="navButton">Back</button></Link>
            } else if (url === '/SaleReview') {
                rightDisplay = <Link to='/SaleDescription'><button className="rightButton" id="navButton">Back</button></Link>
            } else {
                rightDisplay = <Link to='/ProfileView'><button className="rightButton" id="navButton" onClick={this.props.CLEARSALE}>Profile</button></Link>
            }
        } else {
            if (url === '/Login') {
                rightDisplay = <div className="rightButton" id="navButton"></div>
            } else {
                rightDisplay = <Link to='/Login'><button className="rightButton" id="navButton">Login</button></Link>
            }
        }

        if (url === '/Loading') {
            return <div> </div>
        }
        return (
            <div className="Footer">
                {leftDisplay}
                <Link to='/SaleList' className="Logo"></Link>
                {rightDisplay}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        url: state.url,
        user: state.user
    }
}

export default connect(mapStateToProps, { CLEARSALE, LOGINOUT })(Footer)