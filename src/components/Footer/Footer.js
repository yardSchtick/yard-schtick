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
            location: '/mapview'
        }
    }
    componentDidMount() {
        var display = null
        if (this.state.location === '/SaleList') {
            display = <Link to='/MapView'><button>Map</button></Link>
            this.setState({showMap: display})
        } else {
            display = <Link to='/SaleList'><button>List</button></Link>
            this.setState({showMap: display})
        }
    }


    render() {
        return (
            <div>
                {this.state.showMap}
                <h2>YardShtick</h2>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        url: state.url
    }
}

export default connect(mapStateToProps, {})(Footer)