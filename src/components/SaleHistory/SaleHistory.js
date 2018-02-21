import React, { Component } from 'react';

export default class SaleHistory extends Component {
    constructor(props){
        super(props)
        
        this.repostClick = this.repostClick.bind(this)
        this.deleteClick = this.deleteClick.bind(this)

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