import React, {Component} from 'react';
import ListButton from './ListButton'
import MapButton from './MapButton'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Footer extends Component {
    constructor() {
        super()

        this.state ={
            showMap: null,
            buttonShow: null
        }
    }

    startUp = () => {
        
    }

    render() {

        var {url} = this.props
        var leftDisplay = null
        var rightDisplay = null

        if (url !== '/SaleList') {
            leftDisplay = <Link to='/SaleList'><button>List</button></Link>
        } else {
            leftDisplay = <Link to='/MapView'><button>Map</button></Link>
        }

        if(this.props.user) {
            rightDisplay = <Link to='/AddNewSale'><button>Profile</button></Link>
        } else {
            if (url === '/Login') {
                rightDisplay = null
            } else {
                rightDisplay = <Link to='/Login'><button>Login</button></Link>
            }
        }

        return (
            <div className="Footer">
                {leftDisplay}
                <div className="Logo"></div>
                {rightDisplay}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        url: state.url,
        user: state.user
    }
}

export default connect(mapStateToProps, {})(Footer)