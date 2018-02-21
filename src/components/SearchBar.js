import reach, { Component } from 'react'

class SearchBar extends Component {
    constructor() {
        super()
        this.state = {
            drop: false
        }
    }
    setDropStatus() {
        this.setState = {
            drop: true
        }
    }

    render() {
        return (
            <div>
                <div>
                    <input placeHolder='Search' />
                    <button onClick={this.setDropStatus}>
                        <img />
                    </button>
                </div>
                <div className={this.state.drop ? search : searchDropped}></div>
            </div>
        )
    }
}