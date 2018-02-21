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
            location: '/mapview',
            buttonShow: null
        }
    }

    componentDidMount() {
        var {location} = this.state
        var leftDisplay = null
        var rightDisplay = null

        if (location === '/SaleList') {
            leftDisplay = <Link to='/MapView'><button>Map</button></Link>
            this.setState({showMap: leftDisplay})
        } else {
            leftDisplay = <Link to='/SaleList'><button>List</button></Link>
            this.setState({showMap: leftDisplay})
        }

        if(this.props.user) {
            rightDisplay = <Link to='/AddNewSale'><button>Profile</button></Link>
            this.setState({buttonShow: rightDisplay})
        } else {
            rightDisplay = <Link to='/ProfileView'><button>Login</button></Link>
            this.setState({buttonShow: rightDisplay})
        }
    }


    render() {
        return (
            <div className="Footer">
                {this.state.showMap}
                <div className="Logo"></div>
                {this.state.buttonShow}
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