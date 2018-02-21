import React, { Component } from 'react';
import Footer from '../components/Footer/Footer';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { getSales } from '../Duck/redux';
import { connect } from 'react-redux';
import pin from '../images/pin.ico'
import axios from 'axios';
import Modal from 'react-responsive-modal';


class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      sales: [],
      open: false,
      markerInfo: {}
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
    console.log('hit')
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
  componentDidMount() {
    axios.get('/api/getAllSales').then(response => {
      console.log(response);
      this.setState({
        sales: response.data
      });

    });
  }
  render() {
    const { open } = this.state;
    
    const style = {
      height: '100vh',
      width: '100%'
    }
    const markers = this.state.sales.map((e, i) => {
      return (

        <Marker key={i}
          onClick={_ => this.onOpenModal(i)}
          title={e.sale_desc}
          icon={{
            url: pin
            // scaledSize: new google.maps.Size(64,64)
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
          name={'Current location'} />

        <Modal open={open} onClose={this.onCloseModal} little>
          <h1>{this.state.markerInfo.sale_name}</h1>
          <img className='modal-img' src={this.state.markerInfo.sale_img} ref='picture of garage sale'/>
          <h2>{this.state.markerInfo.sale_desc}</h2>
          <h3>{this.state.markerInfo.address_street}</h3>
          <h3>{this.state.markerInfo.address_city}</h3>
          <h3>{this.state.markerInfo.address_state}</h3>
          <h3>{this.state.markerInfo.address_zip}</h3>
        </Modal>
      </Map>
    );
  }
}

function mapStatetoProps(state) {
  return {
    sales: state.sales
  }
}

var MapConnect = connect(mapStatetoProps, { getSales })(MapView)

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCtb8eSgekxRgxSDay7RzJW09YEsTmBOmc'
})(MapConnect);