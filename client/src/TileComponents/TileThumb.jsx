import React from 'react';

class TileThumb extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div onClick={() => this.props.locationSelect(this.props.id)}>
       <div className="img__wrap">
           <img className="img__img" src={this.props.photo}  style={{height:200, width: 300}}/>
          <p className ="img__description" >{this.props.name}</p>
      </div>
      </div>
    );
  }
}

export default TileThumb;

