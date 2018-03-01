import React, { Component } from 'react';
// import Footer from '../components/Footer/Footer';
import { connect } from 'react-redux';
import { GETURL, getSales } from '../Duck/redux';
import Search from './Search/SearchBar';

class SaleList extends Component {

    constructor() {
        super()
        this.state = {
            lat: null,
            lng: null
        }
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }, _ => this.props.getSales(this.state.lng, this.state.lat, this.props.distance))
          })
          this.props.GETURL(this.props.match.url);
    }

    componentDidMount() {
        this.props.GETURL(this.props.match.url)
    }

    render() {  
            var saleCard = this.props.sales.map((val, index) => (

                <div key={index}>
                    <p>{val.sale_name}</p>
                    <p>{val.sale_description}</p>
                    <p>{val.start_time}</p>
                    <p>{val.end_time}</p>
                </div>
            ))
    

        return (
            <div>
                <Search 
                latitude={this.state.lat}
                longitude={this.state.lng}/>
                {saleCard}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        sales: state.sales,
        distance: state.distance
    }
 }

export default connect(mapStateToProps, { GETURL, getSales })(SaleList)