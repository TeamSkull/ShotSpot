import React from 'react';
import ReactDOM from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export class MapView extends React.Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    
    return (
      <div className="map-wrap">
        <Map className="map-image"
          style={{height: '35vh'}}
          center={this.props.searchCoordinates}
          zoom={10}>
          <div className="map-description"> click map to explore </div>

            <TileLayer
            url="https://api.mapbox.com/styles/v1/fabbous/cj3gnpyq200112rtiabmb608s/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmFiYm91cyIsImEiOiJjajNnbmlmNmQwMDRlMnFxc3Nwdms0dGV1In0.3IAYFLfwY1Z_eh1OxEognA"
            attribution="<attribution>" />

            
            <Marker position={this.props.searchCoordinates}>
            </Marker>

       
        </Map>



      </div>
    );
  }
}

export default MapView;