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
            <div class="sk-circle">
                <div class="sk-circle1 sk-child"></div>
                <div class="sk-circle2 sk-child"></div>
                <div class="sk-circle3 sk-child"></div>
                <div class="sk-circle4 sk-child"></div>
                <div class="sk-circle5 sk-child"></div>
                <div class="sk-circle6 sk-child"></div>
                <div class="sk-circle7 sk-child"></div>
                <div class="sk-circle8 sk-child"></div>
                <div class="sk-circle9 sk-child"></div>
                <div class="sk-circle10 sk-child"></div>
                <div class="sk-circle11 sk-child"></div>
                <div class="sk-circle12 sk-child"></div>
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