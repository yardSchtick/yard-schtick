import React, { Component } from 'react'
import { GETURL, LOGINOUT } from '../../Duck/redux'
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import "./loading.css"

class LandingPage extends Component {

    componentDidMount() {
        axios.get('/checkLogin').then(res => {
            this.props.LOGINOUT(res.data)
        })
        this.props.GETURL(this.props.match.url)
    }

    render() {

        if (this.props.loggedin) {
            return <Redirect to='/ProfileView' />
        }

        return (
            <div className="sk-circle">
                <div className="sk-circle1 sk-child"></div>
                <div className="sk-circle2 sk-child"></div>
                <div className="sk-circle3 sk-child"></div>
                <div className="sk-circle4 sk-child"></div>
                <div className="sk-circle5 sk-child"></div>
                <div className="sk-circle6 sk-child"></div>
                <div className="sk-circle7 sk-child"></div>
                <div className="sk-circle8 sk-child"></div>
                <div className="sk-circle9 sk-child"></div>
                <div className="sk-circle10 sk-child"></div>
                <div className="sk-circle11 sk-child"></div>
                <div className="sk-circle12 sk-child"></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedin: state.loggedin
    }
}

export default connect(mapStateToProps, { GETURL, LOGINOUT })(LandingPage)