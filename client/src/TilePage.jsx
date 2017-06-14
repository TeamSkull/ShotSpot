import React from 'react';
import axios from 'axios';
import TileThumb from './TileComponents/TileThumb.jsx';
import IndivComponent from './IndivComponent.jsx';
import BigMap from './BigMap.jsx';
import MapView from './MapView.jsx';
import Navigation from './Navigation.jsx';
import Filter from './Filter.jsx';
import { Redirect } from 'react-router';
import queryString from 'query-string';
import Masonry from 'react-masonry-component';
import MasonryInfiniteScroller from 'react-masonry-infinite';

var masonryOptions = {
    transitionDuration: 0
};

var style= {
  paddingLeft: "100px"
}

class TilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {objects: ['...Loading'], locSelect: 'tileSearch', url: '', bigMap: false, value: 'View All Categories'};
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.filterFun = this.filterFun.bind(this);
  }

  handleMapClick() {
    this.setState({bigMap: true});
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
        url: stringyurl
      });
    }).catch((error) => {
      console.log('This error is in the TilePage under getphotosinrange: ', error);
    });
  }

  locationSelect(componentID) {
    this.setState({locSelect: componentID});
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
    let tempObjects = this.state.objects.filter(this.filterFun);
    let urlbigmap = (this.props.location.state) ? this.props.location.state.stringy : this.props.match.params.id;
    let url = this.props.match.params.id;
    let parsed = queryString.parse(url);
    parsed.latitude = parseFloat(parsed.latitude);
    parsed.longitude = parseFloat(parsed.longitude);
    let Lat = (this.props.location.state) ? this.props.location.state.Latitude : parsed.latitude
    let Lon = (this.props.location.state) ? this.props.location.state.Longitude : parsed.longitude
    let filterUrlString = (parsed.filter) ? queryString.stringify(parsed.filter) : queryString.stringify({filter: this.state.value});
    let filterInitVal = parsed.filter || this.state.value;
    if (this.state.bigMap) {
      return <Redirect push to={{pathname: '/BigMap/' + filterUrlString + '&' + urlbigmap, state: {objects: this.state.objects, filteredObjects: tempObjects, Latitude: Lat, Longitude: Lon, currentFilter: this.state.value}}} />;
    } else if (this.state.locSelect !== 'tileSearch') {
      return <Redirect push to={{pathname: '/Location/' + this.state.locSelect + '/' + this.props.location.state.stringy, state: {locSelect: this.state.locSelect, Latitude: this.props.location.state.Latitude, Longitude: this.props.location.state.Longitude}}} />;
    } else {
      return (

        <div id="tile">
        <Navigation />
          <MapView searchCoordinates={this.state.searchCoordinates}/>
         <div className="container-fluid-fullwidth">
         <h4 onClick={this.handleMapClick.bind(this)}>Click me for mapview!</h4>
          <div className="searched-location">
          {this.props.location.state.searchedLocation}
          </div>

          <div className="explore">
          </div>
           <Filter coordObjs={this.state.objects} initValue={filterInitVal} handleChangeFilter={this.handleChangeFilter} />
          <Masonry
            className={'locations-masonry'}
            style={style}
            options={masonryOptions}
          >

          
         
          
           {(this.state.objects !== ['...Loading']) ? tempObjects.map((object) => {
            return (
              <div key={object.coverPhoto}>
                <div id="columns">
                  <TileThumb key={object.coverPhoto} locationSelect={this.locationSelect.bind(this)} photo={object.coverPhoto} id={object.id} name={object.name} latitude={object.coordinates.latitude} longitude= {object.coordinates.longitude} comments={object.comments}/>
                </div>
              </div>
            );
          }) : console.log('The map has only the ...Loading portion')} 
          </Masonry>
          </div>
        </div>
      );
    }
  }
}

export default TilePage;