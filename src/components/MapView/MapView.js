import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GETURL } from '../../Duck/redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import './MapView.css';
import bluePin from '../../images/pushpin-blue.png'
import greenPin from '../../images/pushpin-green.png'

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

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }


  onOpenModal(idx) {
    this.setState({
      open: true,
      markerInfo: this.state.sales[idx]
    });
  };

  onCloseModal() {
    this.setState({
      open: false
    });
  };

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }
  componentWillMount() {
    
  }
  componentDidMount() {
    axios.get('/api/getAllSales').then(response => {
      this.setState({
        sales: response.data
      });

    });

    this.props.GETURL(this.props.match.url);
  }
  render() {
    const { open } = this.state;

    const style = {
      height: '91.5vh',
      width: '100%'
    }
    const markers = this.state.sales.map((e, i) => {
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
      <Map
        google={this.props.google}
        zoom={10}
        style={style}
        centerAroundCurrentLocation={true}
      >
        {markers}
        <Marker onClick={this.onMarkerClick}
        google={this.props.google}
          name={'Current location'} 
          /* icon={{
            url: bluePin,
            scaledSize: new this.props.google.maps.Size(40, 40)
          }} */
          />

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
    );
  }
  componentDidUpdate(){
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }
}

function mapStateToProps(state) {
  return {
    sales: state.sales,
    url: state.url
  }
}

var MapConnect = connect(mapStateToProps, { GETURL })(MapView)

export default GoogleApiWrapper({
  apiKey: process.env.API_KEY
})(MapConnect);
