import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { GETURL, ADDDESCRIPT } from '../Duck/redux';
import Uploader from './Uploader'

class SaleDesc extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sale_name: null,
            sale_desc: null,
            count: 300,
        }
    }

    componentDidMount() {
        this.props.GETURL(this.props.match.url)
        if (this.props.newSale) {
            this.setState({ sale_desc: this.props.newSale.sale_desc, sale_name: this.props.newSale.sale_name })
        }
    }

    handleDec = (e) => {
        var num = 300 - e.split('').length
        this.setState({ sale_desc: e, count: num })
    }

    handleName = (e) => {
        this.setState({ sale_name: e })
    }

    render() {
        return (
            <div>
                <h1 className="saleDescH1">Sale Description</h1>
                <p className="subtitle">(this part is optional)</p>

                <div className="inputContainer">
                    <div className="inputIndividualContainer">
                        <p>Sale Title:</p>
                        <input
                            id="largeInput"
                            value={this.state.sale_name ? this.state.sale_name : ''}
                            onChange={e => this.handleName(e.target.value)} />
                    </div>

                    <div className="inputIndividualContainer descriptionContainer">
                        <p>Description:</p>
                        <textarea
                            id="descriptionInput"
                            placeholder="This should be a general overview of what you're selling"
                            value={this.state.sale_desc ? this.state.sale_desc : ''}
                            onChange={e => this.handleDec(e.target.value)} />
                        <p className="characters">Characters Left: {this.state.count}</p>
                    </div>

                    <div className="inputIndividualContainer" id="pictureContainer">
                        <p>Picture:</p>
                        <Uploader />
                    </div>

                    <div className="profileButtonContainer">
                    <Link to='/SaleReview'><button id="profileAddSaleButton" onClick={_ => this.props.ADDDESCRIPT({ sale_desc: this.state.sale_desc, sale_name: this.state.sale_name })}>Submit</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        newSale: state.newSale,

        user: state.user
    }
}

export default connect(mapStateToProps, { GETURL, ADDDESCRIPT })(SaleDesc);
