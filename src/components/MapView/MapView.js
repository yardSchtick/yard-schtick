import React, { Component } from 'react';
import { GoogleMap, Marker, Circle, withGoogleMap, MyMapComponent, withScriptjs } from 'react-google-maps';
import { GETURL, getSales } from '../../Duck/redux';
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
      lng: null
    }
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onCenterChanged() {
    // const center = this.props.Circle.getCenter()
    console.log(Circle.getCenter());
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
    this.props.distance

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }, _ => this.props.getSales(this.state.lng, this.state.lat, this.props.distance))
    })
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
      'background-Color' : 'green',
      background: greenPin
    }
    const markers = this.props.sales.map((e, i) => {
      return (
        <Marker key={i}
        className= 'markers'
        style={markerStyle}
          google={this.props.google}
          options={{
            color: 'green'
          }}
          onClick={_ => this.onOpenModal(i)}
          title={e.sale_desc}
          /* icon={{
            url:{greenPin},
            strokeColor: 'green',
            scaledSize: (40, 40)
          }} */
          name={e.sale_name}
          position={{ lat: e.latitude, lng: e.longitude }}
          color='green'
        />
      )
    })
    const miles = this.props.distance * 1000;

    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
      <div>
        <GoogleMap
          defaultZoom={10}
          defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
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
          {markers}
          {props.isMarkerShown && <Marker position={{ lat: this.state.lat, lng: this.state.lng }} />}
          <Circle clickable={false}
            draggable={false}
            editable={true}
            center={{ lat: this.state.lat, lng: this.state.lng }}
            radius={miles}
            ref={circle => { this.circle = circle; }}
            onCenterChanged={(e) => this.onCenterChanged(e)}
            onRadiusChanged={this.onRadiusChanged}
            options={{
              fillColor: '#236e96',
              strokeColor: '#236e96',
            }} />
        </GoogleMap>

      </div>
    ))

    return (
      <div style={{}}>
        <SearchBar longitude={this.state.lng}
          latitude={this.state.lat}

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
    distance: state.distance
  }
}

var MapConnect = connect(mapStateToProps, { GETURL, getSales })(MapView)

export default 
// GoogleApiWrapper({
//   apiKey: process.env.API_KEY
// })
(MapConnect);
