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

    formatTime = (start, end) => {
        var one = this.convertMilitary(start)
        var two = this.convertMilitary(end)

        return one + ' - ' + two
    }

    convertMilitary = (time) => {
        var tempTime = time.split(':').splice(0, 2);

        if (+tempTime[0] < 12) {
            if (+tempTime[0] === 0) {
                tempTime[0] = 12
            }
            tempTime[0] = +tempTime[0]
            return tempTime.join(':') + ' AM'
        }
        if (+tempTime[0] !== 12) {
            tempTime[0] = +tempTime[0] - 12
        }
        return tempTime.join(':') + ' PM'
    }

    formatDescrip = (descrip) => {
        if (descrip.split('').length > 50) {
            return descrip.substring(0,55) + '...'
        } else {
            return descrip
        }
    }

    render() {
        var saleCard = this.props.sales.map((val, index) => {
            let time = this.formatTime(val.start_time, val.end_time)
            let descrip = this.formatDescrip(val.sale_desc)
            
            return (<div key={index} className="saleCard">
                <img className="saleCardImage" src={val.sale_img} />
                <div className="saleCardContent">
                    <div className="saleCardFirstLine">
                        <p>{val.address_street} {val.address_city}</p>
                        <p className="saleCardTime">{time}</p>
                    </div>
                    <p className="saleCardTime">{descrip}</p>
                </div>
            </div>)
        })


        return (
            <div>
                <Search
                    latitude={this.state.lat}
                    longitude={this.state.lng} />
                <div className="listView">
                    {saleCard}
                </div>
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