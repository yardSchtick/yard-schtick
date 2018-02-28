import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { GETURL, GETUSER } from '../../Duck/redux';
import SaleHistory from './../SaleHistory/SaleHistory';
import { Link } from 'react-router-dom';
import './ProfileView.css'

class ProfileView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            person: {},
            sales: [],
            saved: []
        }
        this.getUserSales = this.getUserSales.bind(this);
    }

    componentDidMount() {
        this.props.GETUSER()
        this.getUserSales()
        this.props.GETURL(this.props.match.url)
    }

    componentWillReceiveProps() {
        this.getUserSales()
    }

    getUserSales() {
        axios.get('/api/getUserSales').then(response => {
            console.log("this guy",response)
            this.setState({ sales: response.data })
        })
    }

    render() {
        console.log(this.props)
        let data;
        if (this.state.sales) {
            data = this.state.sales.map((e, i) => {
                return (
                    <SaleHistory key={i} data={e} reget={this.getUserSales} />
                )
            })
        }

        return (
            <div>
                <div>
                    <div className="userPic" style={{ backgroundImage: `url('${!this.props.user ? '' : this.props.user.user_img}')` }}></div>
                    <div>profile info
                        <div> name {!this.props.user ? '' : this.props.user.user_name}</div>
                        <div> address st {!this.props.user ? '' : this.props.user.address_street} </div>
                        <div>
                            <div> address city{!this.props.user ? '' : this.props.user.address_city} </div>
                            <div> state{!this.props.user ? '' : this.props.user.address_state} </div>
                            <div> zip{!this.props.user ? '' : this.props.user.address_zip} </div>
                        </div>

                        <Link to='/EditProfile'><button> update profile</button> </Link>
                    </div>
                </div>
                <br/>
                <br/>                
                {data}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        url: state.url,
        user: state.user,
        sales: state.sales
    }
}
export default connect(mapStateToProps, { GETURL, GETUSER })(ProfileView);