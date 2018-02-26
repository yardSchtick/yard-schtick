import React, { Component } from 'react';
import './SearchBar.css';
import Slider from 'react-rangeslider'
import '../../../node_modules/react-rangeslider/lib/index.css'
import axios from 'axios';
import {connect} from 'react-redux';
import {getSales, changeDistance} from '../../Duck/redux';


class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 20,
            sales: []

        }
    }
  
    handleChangeStart = () => {
      };
    
    handleChange = value => {
       this.props.changeDistance(value);
        this.setState({
          value: value
        })
      };
    
    handleChangeComplete = () => {
        this.props.getSales(this.props.longitude, this.props.latitude, this.state.value);
      };
    componentDidMount(){
        console.log(this.props.distance)
        this.setState({
            value: this.props.distance
        })
         
      };


    render() {
        return (
            <div className='search-main'>
                <div className='search-div'>
                    <input className='search' placeholder='Search' />
                     <Slider
                        min={0}
                        max={100}
                        value={this.props.distance}
                        onChangeStart={this.handleChangeStart}
                        onChange={this.handleChange}
                        onChangeComplete={this.handleChangeComplete}
                        className='slider'
                    /> 
                    <p className='p'>DISTANCE: {this.props.distance} miles</p>

                </div>

            </div>

        )
    }
}

function mapStateToProps(state){
    return {
        distance: state.distance
    }
}

export default connect(mapStateToProps, {getSales, changeDistance})(SearchBar);