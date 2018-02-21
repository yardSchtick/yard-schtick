import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GETURL } from '../../Duck/redux'

class SaleHistory extends Component {
    constructor(props){
        super(props)
        
        this.repostClick = this.repostClick.bind(this)
        this.deleteClick = this.deleteClick.bind(this)

    }

    componentDidMount() {
        this.props.GETURL(this.props.match.url)
    }
    
    repostClick(){
        console.log("repost clicked")
    }
    deleteClick(){
        console.log("delete clicked")
    }
    render() {
        console.log('sale history check me',this.props)
        return (
            <div>
                <div>sale history
                    <div>
                        <div></div>
                        <div>old date{this.props.data.end_date}</div>
                        <button onClick={this.repostClick}>repost</button>
                        <button onClick={this.deleteClick}>delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) { return {
        url: state.url
}}

export default connect(mapStateToProps, { GETURL })(SaleHistory)