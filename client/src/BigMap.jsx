import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Filter from './Filter.jsx';
import queryString from 'query-string';

class BigMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {objects: ['loading in bigmap'], searchCoordinates: '', url: '', filteredObjects: false, value: 'View All Categories'};
    let url = this.props.match.params.id;
    let parsed = queryString.parse(url);
    let stringyurl = queryString.stringify(url);
    parsed.latitude = parseFloat(parsed.latitude);
    parsed.longitude = parseFloat(parsed.longitude);
    axios({
      url: '/tilePage/getPhotosInRange',
      method: 'post',
      data: parsed
    }).then((results) => {
      this.setState({
        objects: results.data.locations,
        searchCoordinates: results.data.searchCoordinates,
        url: stringyurl,
        filteredObjects: (this.props.location.state) ? this.props.location.state.filteredObjects : results.data.locations
      });
    }).catch((error) => {
      console.log('This error is in the TilePage under getphotosinrange: ', error);
    });

    this.handleChangeFilter = this.handleChangeFilter.bind(this);
  }

  handleChangeFilter(event) {
    this.setState({value: event.target.value});
  }

  filterFun(value) {
    if (this.state.value !== 'View All Categories') {
      return value.category === this.state.value; 
    } else {
      return value.category;
    }
  }

  render() {
    let url = this.props.match.params.id;
    let parsed = queryString.parse(url);
    let stringyurl = queryString.stringify(url);
    let filteredAlt;
    parsed.latitude = parseFloat(parsed.latitude);
    parsed.longitude = parseFloat(parsed.longitude);
    const position = [parsed.latitude, parsed.longitude];
    let filterInitVal = parsed.filter || this.props.objects;
    let objects = (this.props.location.state) ? this.props.location.state.filteredObjects : this.state.objects;
    let initialValue = (this.props.location.state) ? this.props.location.state.currentFilter : 'View All Categories'

    return (
      <div>
        <Filter coordObjs={this.state.objects} initValue={filterInitVal} handleChangeFilter={this.handleChangeFilter} />
        <Map
          style={{height: '100vh'}}
          center={position}
          zoom={10}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/fabbous/cj3gnpyq200112rtiabmb608s/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmFiYm91cyIsImEiOiJjajNnbmlmNmQwMDRlMnFxc3Nwdms0dGV1In0.3IAYFLfwY1Z_eh1OxEognA"
            attribution="<attribution>" />
            {(this.state.objects[0] !== 'loading in bigmap') ? objects.map((location, i) => {
              return (
                <div key={i}>
                  <Marker position={[location.coordinates.latitude, location.coordinates.longitude]}>
                    <Popup>
                      <span><img src={location.coverPhoto} /> <hr/> {location.name}</span>
                    </Popup>
                  </Marker>
                </div>
              );
            }) : console.log('The objects have not loaded yet')}
        </Map>
      </div>
    );
  }
}

export default BigMap;