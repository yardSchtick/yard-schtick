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
        var leftDisplay = null
        if (this.state.location === '/SaleList') {
            leftDisplay = <Link to='/MapView'><button>Map</button></Link>
            this.setState({showMap: leftDisplay})
        } else {
            leftDisplay = <Link to='/SaleList'><button>List</button></Link>
            this.setState({showMap: leftDisplay})
        }

        var rightDisplay = null
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