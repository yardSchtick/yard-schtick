import React, { Component } from 'react';
import Footer from '../components/Footer/Footer';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {getSales} from '../Duck/redux';
import {connect} from 'react-redux';


class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
    
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }
  onMarkerClick(props, marker, e){
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }
  componentDidMount(){

  }
  render() {
    const style = {
      height : '70%',
      width: '100%'
    }
    return (
      <Map
      google={this.props.google}
      zoom={10}
      style = {style}
      initialCenter={{
        lat: 40.2338438,
        lng: -111.65853370000002
      }}
      >
      <Marker
        onClick={this.onMarkerClick}
        title={'Michael House'}
        name={'My house'}
        position={{lat: 40.7762402, lng: -111.8739506}}
      />
      <Marker
        name={'Dolores'}
        position={{lat: 40.759703, lng: -111.428093}} />
      <Marker />
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={ this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

function mapStatetoProps(state){
  return {
    sales: state.sales
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCtb8eSgekxRgxSDay7RzJW09YEsTmBOmc'
})(MapView);