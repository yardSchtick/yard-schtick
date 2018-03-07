import React, {Component} from 'react'
import axios from 'axios'

class Dropdown extends Component {

    handleChange = (e) => {
        var {long, lat, distance} = this.props
        
        if (e.target.value) {
            axios.get(`/api/search?longitude=${long}&latitude=${lat}&distance=${distance}&search=${e.target.value}`).then( res => {
                    this.props.SETSEARCH(res.data)
            })
        } else {
            this.props.getSales(long,lat,distance)
        }
    }

    render() {
        return (
            <div className={this.props.show ? "dropdownMain" : "dropdownMain closed"}>
                <input id="searchInput"
                    maxLength='50'
                    onChange={this.handleChange}
                    placeholder="Search by Inventory"/>
            </div>
        )
    }
}

export default Dropdown