import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Filter from './Filter.jsx';
import PopupComponent from './PopupComp.jsx';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class BigMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {objects: ['loading in bigmap'], searchCoordinates: '', url: '', filteredObjects: false, value: 'View All Categories', popCat: '', position: [0, 0], popupLocation: '', filterValue: 'View All Categories', popupTrigger: false, popupID: 0};
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.filterFun = this.filterFun.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.popupSubmit = this.popupSubmit.bind(this);
    this.locationPopupText = this.locationPopupText.bind(this);
    this.handleChangePopupFilter = this.handleChangePopupFilter.bind(this);
    this.categoryPopupText = this.categoryPopupText.bind(this);
    // this.handlePopImageClick = this.handlePopImageClick.bind(this);
  }

  componentWillMount() {
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
        value: parsed.filter || this.props.currentFilter,
        sessionUser: results.data.sessionUser
      });
    }).catch((error) => {
      console.log('This error is in the TilePage under getphotosinrange: ', error);
    });
  }

  locationPopupText(e){
    this.setState({popupLocation: e.target.value})
  }

  categoryPopupText(e){
    this.setState({popCat: e.target.value});
  }

  showPopup(e) {
    console.log('This is the show coords: ', e);
    let latcoord = e.latlng.lat;
    let loncoord = e.latlng.lng;
    this.setState({position: [latcoord, loncoord]});
  }

  popupSubmit() {
    let locationcoords = {};
    locationcoords.coords = this.state.position;
    locationcoords.category = this.state.filterValue;
    locationcoords.location = this.state.popupLocation
    axios({
      method: "POST",
      url: '/bigmap/popupSubmit',
      data: locationcoords
    }).then((results) => {
      console.log(results, ' :This is from bigmaps popup');
    }).catch((error) => {
      console.log(error, 'This is from the bigmap popup');
    })
  }

  handleChangeFilter(event) {
    console.log('this is the selection from handlechange from the bigmap: ', event.target.value);
    this.setState({value: event.target.value});
  }

  filterFun(value) {
    if (this.state.value !== 'View All Categories') {
      return value.category === this.state.value; 
    } else {
      return value.category;
    }
  }

  handleChangePopupFilter(event) {
    console.log('this is the selection from handlechangefilter that state is being changed to: ', event.target.value);
    this.setState({filterValue: event.target.value});
  }

  handlePopImageClick(locater){
    this.setState({popupTrigger: true, popupID: locater})
  }

  render() {
    if(this.state.popupTrigger){
      return <Redirect push to={{pathname: '/Location/' + this.state.popupID}} />;
    }
    let tempObjects = this.state.objects.filter(this.filterFun);
    let urlbigmap = (this.props.location.state) ? this.props.location.state.stringy : this.props.match.params.id;
    let url = this.props.match.params.id;
    let parsed = queryString.parse(url);
    parsed.latitude = parseFloat(parsed.latitude);
    parsed.longitude = parseFloat(parsed.longitude);
    let position = [parsed.latitude, parsed.longitude];
    let Lat = (this.props.location.state) ? this.props.location.state.Latitude : parsed.latitude;
    let Lon = (this.props.location.state) ? this.props.location.state.Longitude : parsed.longitude;
    let filterUrlString = (parsed.filter) ? queryString.stringify(parsed.filter) : queryString.stringify({filter: this.state.value});
    let filterInitVal = this.state.value || parsed.filter;
    let filterPopupInitVal = this.state.filterValue || parsed.filter;
    let objects = (this.props.location.state) ? this.props.location.state.filteredObjects : this.state.objects;
    let initialValue = (this.props.location.state) ? this.props.location.state.currentFilter : 'View All Categories';

    return (
      <div className="container-fluid-fullwidth" id="big-map">
      <h id="big-map-tip"> Add a location by dropping a pin on the map </h> 
        <Filter coordObjs={this.state.objects} initValue={filterInitVal} handleChangeFilter={this.handleChangeFilter} /> 
        <Map className="big-map-image"
          onClick={this.showPopup}
          style={{height: '100vh'}}
          center={position}
          zoom={12}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/fabbous/cj3gnpyq200112rtiabmb608s/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmFiYm91cyIsImEiOiJjajNnbmlmNmQwMDRlMnFxc3Nwdms0dGV1In0.3IAYFLfwY1Z_eh1OxEognA"
            attribution="<attribution>" />
              <Marker position= {this.state.position}>
                <Popup>
                  <span>
                    <form id="input-form">
                      <input className="ui input" id="add-location-input"onChange={this.locationPopupText} placeholder="Enter location name"></input>
                      <Filter className="PopFilter" initValue={filterPopupInitVal} handleChangeFilter={this.handleChangePopupFilter}/>
                      <input onClick={this.popupSubmit} type="submit" value="Add Location"className="ui teal button" id="pop-input-button"></input>
                    </form>
                  </span>
                </Popup>
              </Marker>
            {(this.state.objects !== 'loading in bigmap') ? tempObjects.map((location, i) => {
              return (
                <div key={i}>
                  <Marker position={[location.coordinates.latitude, location.coordinates.longitude]}>
                      <Popup>
                        <span><img onClick={this.handlePopImageClick.bind(this,location.id)} src={location.coverPhoto} id="location-photo-big-map"/> <hr/> <h id="location-name-big-map">{location.name}</h></span>
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