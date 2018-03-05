import React, { Component } from 'react';
import { GoogleMap, Marker, Circle, withGoogleMap, MyMapComponent, withScriptjs } from 'react-google-maps';
import { GETURL, getSales, setLatLng } from '../../Duck/redux';
import { connect } from 'react-redux';
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
      lng: null,
      grabLoc: true,
      latitude: null,
      longitude: null
    }
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onCenterChanged = this.onCenterChanged.bind(this);

  }

  onCenterChanged(mapView) {
    return function () {
      const center = this.getCenter();
      console.log(center)
      mapView.props.getSales(center.lng(), center.lat(), mapView.props.distance).then(() => {
         mapView.props.setLatLng({
          lat: center.lat(),
          lng: center.lng()
        })
      })
      console.log(center.lat())
    }
  }
  onRadiusChanged(mapView) {
    return function () {
      console.log(this.getRadius());

    }

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
    
    if(!this.props.latLng.lat) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }, _ => 
        this.props.getSales(this.state.lng, this.state.lat, this.props.distance).then(res => {

          this.props.setLatLng({
            lat: this.state.lat,
            lng: this.state.lng
          })
        }))
      })
    } else {
      this.setState({
        lat: this.props.latLng.lat,
        lng: this.props.latLng.lng
      }, _ => this.props.getSales(this.props.latLng.lng, this.props.latLng.lat, this.props.distance))

    }

    this.props.GETURL(this.props.match.url);
  }


  render() {
    const { open } = this.state;
    const style = {
      height: '515px',
      width: '100%',
      margin: '72px 0 54px 0'
    }
    const modal = {
      'z-index': '20'
    }
    const markerStyle = {
      width: '10px',
      height: '10px'
    }
    const markers = this.props.sales.map((e, i) => {
      return (
        <Marker key={i}
          className='markers'
          style={markerStyle}
          google={this.props.google}
          options={{
            color: 'green'
          }}
          onClick={_ => this.onOpenModal(i)}
          title={e.sale_desc}
           icon={{
            url:greenPin
          }} 
          name={e.sale_name}
          position={{ lat: e.latitude, lng: e.longitude }}
        />
      )
    })
    const miles = this.props.distance * 1000;

    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
      <div>
        <GoogleMap
          defaultZoom={10}
          defaultCenter={{ lat: this.props.latLng.lat, lng: this.props.latLng.lng }}
        >
          <Modal open={open} onClose={this.onCloseModal} little>
            <h1>{this.state.markerInfo.sale_name}</h1>
            <img className='modal-img' src={this.state.markerInfo.sale_img} alt="" />
            <h2>{this.state.markerInfo.sale_desc}</h2>
            <h3>{this.state.markerInfo.address_street}</h3>
            <h3>{this.state.markerInfo.address_city}</h3>
            <h3>{this.state.markerInfo.address_state}</h3>
            <h3>{this.state.markerInfo.address_zip}</h3>
          </Modal>
          {props.isMarkerShown && <Marker 
          position={{ lat: this.state.latitude, lng: this.state.longitude }}
          icon={{
            url:bluePin
          }}  />}
          {markers}
          <Circle
            clickable
            draggable={false}
            editable={true}
            center={{ lat: this.props.latLng.lat, lng: this.props.latLng.lng}}
            radius={miles}
            ref={circle => { this.circle = circle; }}
            onCenterChanged={this.onCenterChanged(this)}
            onRadiusChanged={this.onRadiusChanged(this)}
            options={{
              fillColor: '#236e96',
              strokeColor: '#236e96',
            }} />
        </GoogleMap>

      </div>
    ))

    return (
      <div style={{}}>
        <SearchBar 
        />


        <MyMapComponent isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={style} />}
          mapElement={<div style={{ height: `100%` }} />}
        >




        </MyMapComponent>
      </div >
    );
  }

}

function mapStateToProps(state) {
  return {
    sales: state.sales,
    url: state.url,
    distance: state.distance,
    latLng: state.latLng
  }
}

var MapConnect = connect(mapStateToProps, { GETURL, getSales, setLatLng })(MapView)

export default
  // GoogleApiWrapper({
  //   apiKey: process.env.API_KEY
  // })
  (MapConnect);
