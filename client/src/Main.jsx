import React from 'react';
import axios from 'axios';
import SearchComponent from './SearchComponent.jsx';
import TilePage from './TilePage.jsx';
import { Redirect } from 'react-router';
const queryString = require('query-string');

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchValue: '', Latitude: 0, Longitude: 0, submitted: false};
  }

  updateInputValue (e) {
    this.setState({
      searchValue: e.target.value
    });
  }

  handleSubmit(e) {
    axios({
      url: '/search/results',
      method: 'post',
      data: {search: this.state.searchValue}
    }).then((results) => {
      this.setState({Latitude: results.data.Latitude, Longitude: results.data.Longitude, submitted: results.data.Search});
    }).catch((error) => {
      console.log('This is an error from the axios call in Main.jsx: ', error);
    });
    e.preventDefault();
  }

  render() {
    if (this.state.submitted) {
      let coordinates = {latitude: this.state.Latitude, longitude: this.state.Longitude};
      let filterVal = {filter: 'View All Categories'}
      const stringified = queryString.stringify(coordinates);
      const stringfil = queryString.stringify(filterVal);
      return <Redirect push to={{pathname: '/TilePage/' + stringified, state: {searchedLocation: this.state.searchValue, Latitude: this.state.Latitude, Longitude: this.state.Longitude, stringy: stringified, filter: stringfil}}} />;
    }
    return (
      <div className="container" id="home">
        <SearchComponent submission={this.handleSubmit.bind(this)} changes={this.updateInputValue.bind(this)} latitude={this.state.Latitude} longitude={this.state.Longitude}/>
      </div>
    );
  }
}

export default Main;