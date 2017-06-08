import React from 'react';
import axios from 'axios';
import Carousel from 'nuka-carousel';

class Photographs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {photographs: ['no photos yet']};
  }

  render() {
    return (
      <div>
       
        <h3 className = "photographText"> Photographs </h3>
          <div className="image_grid">
           <Carousel slidesToShow={1} decorators={Carousel.getDefaultProps().decorators.slice(0, 2)}>
            {(this.props.photos) ? this.props.photos.map((photo) => {
             return (
              <div key={photo.uri} className="centerIndiv">
                <img key={photo.uri} src = {photo.uri} />
              </div>
          );
        }) : console.log('There are no photos yet to display for this location.')}
          </Carousel>
        </div>
      </div>
    );
  }
}

export default Photographs;