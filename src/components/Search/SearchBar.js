import React, { Component } from 'react';
import './SearchBar.css';
import Slider from 'react-rangeslider'
import '../../../node_modules/react-rangeslider/lib/index.css'
import axios from 'axios';


class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 50,
            sales: []

        }
    }
  
    handleChangeStart = () => {
      };
    
      handleChange = value => {
       
        this.setState({
          value: value
        })
      };
    
      handleChangeComplete = () => {
        axios.get(`/api/distance?longitude=${this.props.longitude}&latitude=${this.props.latitude}&distance=${this.state.value}`)
        .then(res => {
              this.setState({
                  sales: res.data
              })
        })
      };
      componentDidMount(){
          axios.get(`/api/distance?longitude=${this.props.longitude}&latitude=${this.props.latitude}&distance=${this.state.value}`)
          .then(res => {
                this.setState({
                    sales: res.data
                })
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
                        value={this.state.value}
                        onChangeStart={this.handleChangeStart}
                        onChange={this.handleChange}
                        onChangeComplete={this.handleChangeComplete}
                        className='slider'
                    /> 
                    <p className='p'>Distance: {this.state.value}</p>

                </div>

            </div>

        )
    }
}
export default SearchBar;