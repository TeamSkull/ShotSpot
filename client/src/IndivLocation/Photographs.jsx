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
      <div className="container-fluid" id="photographs">
       
        <h3 className = "photographText"> Photographs </h3>
          <div className="container-fluid-full" id="photo-grid">
           <Carousel slidesToShow={3} slidesToScroll={3} cellSpacing={150} decorators={Carousel.getDefaultProps().decorators.slice(0, 2)}>
            {(this.props.photos) ? this.props.photos.map((photo, i) => {
             return (
              <div key={i} className="centerIndiv">
                <img key={i} src = {photo.uri} style={{height:250, width: 400}}/>
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