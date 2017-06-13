import React from 'react';
import axios from 'axios';
import Comments from './IndivLocation/Comments.jsx';
import Navigation from './Navigation.jsx';
import Photographs from './IndivLocation/Photographs.jsx';
import MapView from './MapView.jsx';
import { Redirect } from 'react-router';

class IndivComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {location: 'A location has not been selected yet'};
  }

  componentWillMount() {
    let location = this.props.match.params.id;
    axios({
      url: '/locationPage/getContent',
      method: 'post',
      data: {locationId: location}
    }).then((results) => {
      this.setState({location: results.data});
    }).catch((error) => {
      console.log('This is an error from the IndivComponent page: ', error);
    });
  }

  render() {
    // let mapPosition = [this.props.location.state.Latitude, this.props.location.state.Longitude];
    return (
      <div className="container-fluid-fullwidth" id="specific-locations">
         {/*<Map />*/}
          {/*<Navigation />*/}
        <hr></hr>
        <Photographs name= {this.state.location.name} photos={this.state.location.photos}/>
        <hr></hr>
        <Comments name={this.state.location.name} comments={this.state.location.comments}/>
      </div>
    );
  }
}

export default IndivComponent;