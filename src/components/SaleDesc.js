import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { GETURL, ADDDESCRIPT } from '../Duck/redux';

class SaleDesc extends Component {
    constructor() {
        super()

        this.state = {
            sale_name: null,
            sale_desc: null,
            count: 300,
        }
    }

    componentDidMount() {
        this.props.GETURL(this.props.match.url)
        if (this.props.newSale) {
            this.setState({sale_desc: this.props.newSale.sale_desc, sale_name: this.props.newSale.sale_name})
        }
    }

    handleDec = (e) => {
        var num = 300 - e.split('').length
        this.setState({ sale_desc: e, count: num })
    }

    handleName = (e) => {
        this.setState({sale_name: e})
    }

    render() {
        return (
            <div>
                <h2>Sale Description</h2>
                <p>(this part is optional)</p>

                <p>Sale Title</p>
                <input
                    value={this.state.sale_name ? this.state.sale_name : ''}
                    onChange={e => this.handleName(e.target.value)} />
                    
                <p>Description:</p>
                <input 
                    placeholder="This should be a general overview of what you're selling"
                    value={this.state.sale_desc ? this.state.sale_desc : ''}
                    onChange={e => this.handleDec(e.target.value)} />
                <p>Characters Left: {this.state.count}</p>

                <div className="itemPic"></div>
                <Link to='/InventoryList'><button onClick={_=>this.props.ADDDESCRIPT({sale_desc: this.state.sale_desc, sale_name: this.state.sale_name})}>Submit</button></Link>
            </div >
        )
    }
}

function mapStateToProps(state) { return {
    newSale: state.newSale
} }

export default connect(mapStateToProps, { GETURL, ADDDESCRIPT })(SaleDesc);
