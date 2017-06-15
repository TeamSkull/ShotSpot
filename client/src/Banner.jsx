import React from 'react';

class Banner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container" id="banner">
            <b>SpotShots</b>  <h1 id="shot-spots-description"> Discover. Explore. Share. </h1>
      </div>
    );
  }
}

export default Banner;
