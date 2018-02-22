import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { GETURL } from '../Duck/redux';

class SaleDesc extends Component {
    constructor() {
        super()

        this.state = {
            sale_desc: null,
            count: 300,
        }
    }

    componentDidMount() {
        this.props.GETURL(this.props.match.url)
    }

    handleDec = (e) => {
        var num = 300 - e.split('').length
        this.setState({ sale_desc: e, count: num })
    }

    render() {
        return (
            <div>
                <h2>Sale Description</h2>
                <p>(this part is optional)</p>
                <p>Description:</p>
                <input placeholder="This should be a general overview of what you're selling"
                    onChange={e => this.handleDec(e.target.value)} />
                <p>Characters Left: {this.state.count}</p>
                <div className="itemPic"></div>
                <Link to='/InventoryList'><button>Submit</button></Link>
            </div >
        )
    }
}

function mapStateToProps(state) { return {} }

export default connect(mapStateToProps, { GETURL })(SaleDesc);
