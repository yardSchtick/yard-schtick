import React, { Component } from 'react';
import Footer from '../components/Footer/Footer';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { getSales } from '../Duck/redux';
import { connect } from 'react-redux';
import pin from '../images/pin.ico'
import axios from 'axios';


class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      sales: []
    }

    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  getSales(){
    const data = axios.get('/api/getAllSales').then(response => {
        this.setState({
          sales: response.data
        });
    })
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }
  componentDidMount() {
    this.getSales();

  }
  render() {
    console.log(this.state.sales);
    const markers = this.state.sales.map((e, i) => {
      return (
        <div key={i}>
        <Marker
        onClick={this.onMarkerClick}
        title={'Michael House'}
        icon={pin}
        name={'My house'}
        position={{ lat: 40.7762402, lng: -111.8739506 }}
      />
      </div>
      )
    })
    const style = {
      height: '100vh',
      width: '100%'
    }

    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={style}
        initialCenter={{
          lat: 40.2338438,
          lng: -111.65853370000002
        }}
      >
        {markers}
        <Marker
          onClick={this.onMarkerClick}
          icon={pin}
          name={'Dolores'}
          position={{ lat: 40.759703, lng: -111.428093 }} />
        <Marker />
        <Marker onClick={this.onMarkerClick}
          name={'Current location'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

function mapStatetoProps(state) {
  return {
    sales: state.sales
  }
}

var MapConnect = connect(mapStatetoProps, {getSales})(MapView)

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCtb8eSgekxRgxSDay7RzJW09YEsTmBOmc'
})(MapConnect);
