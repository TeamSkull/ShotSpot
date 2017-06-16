import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

class ImageUpload extends React.Component {
    constructor(props) {
    super(props);
    console.log(this.props.locationId);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files){
    var file = new FormData();
    file.append('imageToUpload',files[0])
    file.append('locationId', this.props.match.params.id)
    file.append('username', this.props.sessionUser)
    var req=request
              .post('/images/upload')
              .send(file);
    req.end(function(err,response){
        console.log("upload done!!!!!");
    });
  }

  render(){
    return(
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>
          );
  }
}

export default ImageUpload;