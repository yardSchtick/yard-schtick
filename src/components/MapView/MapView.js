import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GETURL, getSales } from '../../Duck/redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import './MapView.css';
import bluePin from '../../images/pushpin-blue.png'
import greenPin from '../../images/pushpin-green.png'
import SearchBar from '../Search/SearchBar';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      sales: [],
      open: false,
      markerInfo: {},
      lat: null,
      lng: null
    }
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onOpenModal(idx) {
    this.setState({
      open: true,
      markerInfo: this.props.sales[idx]
    });
  };

  onCloseModal() {
    this.setState({
      open: false
    });
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }, _ => this.props.getSales(this.state.lng, this.state.lat, 20))
    })
    this.props.GETURL(this.props.match.url);
  }
  render() {
    const { open } = this.state;

    const style = {
      height: '91.5vh',
      width: '100%'
    }
    console.log(this.props.sales);
    const markers = this.props.sales.map((e, i) => {
      return (

        <Marker key={i}
          google={this.props.google}
          onClick={_ => this.onOpenModal(i)}
          title={e.sale_desc}
           icon={{
            url: greenPin,
            scaledSize: new this.props.google.maps.Size(40, 40)
          }} 
          name={e.sale_name}
          position={{ lat: e.latitude, lng: e.longitude }}
        />
      )
    })

    return (
      <div>

        <Map
          google={this.props.google}
          zoom={10}
          style={style}
          centerAroundCurrentLocation={true}
        >
        {this.state.lat ?
          <SearchBar longitude={this.state.lng}
            latitude={this.state.lat}
          /> : ''
        }
          {markers}
          <Marker 
          name={'current Location'} 
          position={{ lat: this.state.lat, lng: this.state.lng}}/>

          <Modal open={open} onClose={this.onCloseModal} little>
            <h1>{this.state.markerInfo.sale_name}</h1>
            <img className='modal-img' src={this.state.markerInfo.sale_img} ref='picture of garage sale' />
            <h2>{this.state.markerInfo.sale_desc}</h2>
            <h3>{this.state.markerInfo.address_street}</h3>
            <h3>{this.state.markerInfo.address_city}</h3>
            <h3>{this.state.markerInfo.address_state}</h3>
            <h3>{this.state.markerInfo.address_zip}</h3>
          </Modal>
        </Map>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    sales: state.sales,
    url: state.url
  }
}

var MapConnect = connect(mapStateToProps, { GETURL, getSales })(MapView)

export default GoogleApiWrapper({
  apiKey: process.env.API_KEY
})(MapConnect);
