import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GETURL, getSales } from '../Duck/redux';
import Search from './Search/SearchBar';
import Modal from 'react-responsive-modal';

class SaleList extends Component {

    constructor() {
        super()
        this.state = {
            lat: null,
            lng: null,
            open: false,
            sale: {}
        }
    }

    componentWillMount() {
            this.setState({
                lat: this.props.latLng.lat,
                lng: this.props.latLng.lng
            }, _ => this.props.getSales(this.state.lng, this.state.lat, this.props.distance))
            this.props.GETURL(this.props.match.url);
     }
    

    formatTime = (start, end) => {
        var one = this.convertMilitary(start)
        var two = this.convertMilitary(end)

        return one + ' - ' + two
    }

    convertMilitary = (time) => {
        var tempTime = time.split(':').splice(0, 2);

        if (+tempTime[0] < 12) {
            if (+tempTime[0] === 0) {
                tempTime[0] = 12
            }
            tempTime[0] = +tempTime[0]
            return tempTime.join(':') + ' AM'
        }
        if (+tempTime[0] !== 12) {
            tempTime[0] = +tempTime[0] - 12
        }
        return tempTime.join(':') + ' PM'
    }

    formatDescrip = (descrip) => {
        if (descrip.split('').length > 50) {
            return descrip.substring(0, 55) + '...'
        } else {
            return descrip
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    }

    onCloseModal = () => {
        this.setState({ open: false });
    }

    handleModal = (sale) => {
        this.setState({ sale: sale },
            this.onOpenModal())
    }

    render() {
        const { open, sale } = this.state;

        var saleCard = this.props.sales.map((val, index) => {
            let time = this.formatTime(val.start_time, val.end_time)
            let descrip = this.formatDescrip(val.sale_desc)

            return (<div key={val.id} className="saleCard" onClick={_ => this.handleModal(val)}>
                <img className="saleCardImage" src={val.sale_img} alt="" />
                <div className="saleCardContent">
                    <div className="saleCardFirstLine">
                        <p>{val.address_street} {val.address_city}</p>
                        <p className="saleCardTime">{time}</p>
                    </div>
                    <p className="saleCardTime">{descrip}</p>
                </div>
            </div>)
        })

        return (
            <div>
                <Search
                    latitude={this.state.lat}
                    longitude={this.state.lng} />
                <div className="listView">
                    {saleCard}
                </div>

                <Modal open={open} onClose={this.onCloseModal} little showCloseIcon={false}>
                    <div className="modalOuter">
                        <button className='closeButton' onClick={this.onCloseModal}>X</button>
                        <div className="img-container">
                            <img className='modal-img' src={sale.sale_img} alt="" />
                        </div>
                        <div className="modalContainer">
                            <h1 id="modalTitle">{sale.sale_name}</h1>
                            <div id="modalBorder"></div>
                            <h1 id="modalSubtitle">{sale.address_street}, {sale.address_city}</h1>
                            <p id="modalDesc">{sale.sale_desc}</p>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        sales: state.sales,
        distance: state.distance,
        latLng: state.latLng
    }
}

export default connect(mapStateToProps, { GETURL, getSales })(SaleList)