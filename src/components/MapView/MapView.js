import React, { Component } from 'react';
import { GoogleMap, Marker, Circle, withGoogleMap, withScriptjs } from 'react-google-maps';
import { GETURL, getSales, setLatLng, changeDistance, setUserLocation } from '../../Duck/redux';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import './MapView.css';
import bluePin from '../../images/pushpin-blue.png'
import SearchBar from '../Search/SearchBar';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
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
    this.onRadiusChanged = this.onRadiusChanged.bind(this);
  }

  onCenterChanged(mapView) {
    return function () {
      const center = this.getCenter();
      mapView.props.getSales(center.lng(), center.lat(), mapView.props.distance).then(() => {
        mapView.props.setLatLng({
          lat: center.lat(),
          lng: center.lng()
        })
      })
    }
  }
  onRadiusChanged(mapView) {
    return function () {
      const radius = this.getRadius();
      const miles = radius / 1000;
      mapView.props.changeDistance(miles)
      mapView.props.getSales(mapView.props.latLng.lng, mapView.props.latLng.lat, miles).then(() => {
      })
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

    if (!this.props.latLng.lat) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }, _ =>
            this.props.getSales(this.state.lng, this.state.lat, this.props.distance).then(res => {
              this.props.setUserLocation({
                latitude: this.state.latitude,
                longitude: this.state.longitude
              })
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
      height: '100vh',
      width: '100%',
      margin: '72px 0 50px 0'
    }
    const markerStyle = {
      width: '10px',
      height: '10px'
    }
    const markers = this.props.sales.map((e, i) => {
      return (
        <Marker key={e.id}
          className='markers'
          style={markerStyle}
          google={this.props.google}
          options={{
            color: 'green'
          }}
          onClick={_ => this.onOpenModal(i)}
          title={e.sale_desc}
          icon={{
            url: bluePin
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
          <Modal open={open} onClose={this.onCloseModal} little showCloseIcon={false}>
            <div className="modalOuter">
              <button className='closeButton' onClick={this.onCloseModal}>X</button>
              <div className="img-container">
                <img className='modal-img' src={this.state.markerInfo.sale_img} alt="" />
              </div>
              <div className="modalContainer">
                <h1 id="modalTitle">{this.state.markerInfo.sale_name}</h1>
                <div id="modalBorder"></div>
                <h1 id="modalSubtitle">{this.state.markerInfo.address_street}, {this.state.markerInfo.address_city}</h1>
                <p id="modalDesc">{this.state.markerInfo.sale_desc}</p>
              </div>
            </div>
          </Modal>
          {props.isMarkerShown && <Marker
            position={{ lat: this.props.location.latitude, lng: this.props.location.longitude }}
             />}
          {markers}
          <Circle
            clickable
            draggable={false}
            editable={true}
            center={{ lat: this.props.latLng.lat, lng: this.props.latLng.lng }}
            radius={miles}
            ref={circle => { this.circle = circle; }}
            onCenterChanged={this.onCenterChanged(this)}
            onRadiusChanged={this.onRadiusChanged(this)}
            options={{
              fillColor: '#236e9650',
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
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API}&v=3.exp&libraries=geometry,drawing,places`}
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
    user: state.user,
    sales: state.sales,
    url: state.url,
    distance: state.distance,
    latLng: state.latLng,
    location: state.location
  }
}

var MapConnect = connect(mapStateToProps, { GETURL, getSales, setLatLng, changeDistance, setUserLocation })(MapView)

export default
  // GoogleApiWrapper({
  //   apiKey: process.env.API_KEY
  // })
  (MapConnect);
