import React, { Component } from 'react';
import Slider from 'react-rangeslider'
import '../../../node_modules/react-rangeslider/lib/index.css'
// import axios from 'axios';
import { connect } from 'react-redux';
import { getSales, changeDistance, SETSEARCH } from '../../Duck/redux';
import Dropdown from './SearchDropdown'


class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 20,
            sales: [],
            drop: false
        }
    }

    componentDidMount() {
        this.setState({
            value: this.props.distance
        })

    };

    handleChange = value => {
        this.props.changeDistance(value);
        this.setState({
            value: value
        })
    };

    handleChangeComplete = () => {
        this.props.getSales(this.props.latLng.lng, this.props.latLng.lat, this.state.value);
    };

    toggleSearch = () => {
        this.setState({ drop: !this.state.drop })
        this.props.getSales(this.props.latLng.lng, this.props.latLng.lat, this.state.value);        
        document.getElementById('searchInput').value=''
    }

    render() {
        return (
            <div className="search-outer">
                <div className='search-main'>
                    <div className='search-div'>
                        <div className='sliderButton'>
                            {/* <input className='search' placeholder='Search' /> */}
                            <Slider
                                min={0}
                                max={100}
                                value={this.props.distance}
                                onChangeStart={this.handleChangeStart}
                                onChange={this.handleChange}
                                onChangeComplete={this.handleChangeComplete}
                                className='slider'
                            />
                            <button className='search' onClick={this.toggleSearch}></button>
                        </div>
                        <p className='p'>DISTANCE: {this.props.distance.toFixed()} miles</p>
                    </div>
                </div>
                <Dropdown
                    show={this.state.drop}
                    long={this.props.latLng.lng}
                    lat={this.props.latLng.lat}
                    distance={this.state.value}
                    SETSEARCH={this.props.SETSEARCH}
                    getSales={this.props.getSales} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        distance: state.distance,
        latLng: state.latLng
    }
}

export default connect(mapStateToProps, { getSales, changeDistance, SETSEARCH })(SearchBar);