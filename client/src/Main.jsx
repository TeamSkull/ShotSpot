import React from 'react';
import axios from 'axios';
import SearchComponent from './SearchComponent.jsx';
import TilePage from './TilePage.jsx';
import { Redirect } from 'react-router';

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
      console.log('This is the result from the axios call in Main.jsx: ', results);
      this.setState({Latitude: results.data.Latitude, Longitude: results.data.Longitude, submitted: results.data.Search});
    }).catch((error) => {
      console.log('This is an error from the axios call in Main.jsx: ', error);
    });
    e.preventDefault();
  }

  render() {
    if (this.state.submitted) {
      return <Redirect push to="/TilePage" />;
    }
    return (
      <div className="container" id="home">
        <SearchComponent submission={this.handleSubmit.bind(this)} changes={this.updateInputValue.bind(this)} latitude={this.state.Latitude} longitude={this.state.Longitude}/>
      </div>
    );
  }
}

export default Main;