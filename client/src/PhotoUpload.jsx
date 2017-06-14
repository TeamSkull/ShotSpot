import React from 'react';
import Dropzone from 'react-dropzone';

class PhotoUpload extends React.Component {
constructor(props) {
    super(props)
    this.state = { files: [] }
  }

  onDrop(files) {
    this.setState({
      files
    });
  }

  render() {
    let dropzoneRef;
    return (
      <div id="upload">
        <Dropzone ref={(node) => { dropzoneRef = node; }} onDrop={(accepted, rejected) => { alert(accepted) }}>
        </Dropzone>
        <hr></hr>
        <button className="big ui teal button" id="blue-button" type="button" onClick={() => { dropzoneRef.open() }}>
         Browse
       </button> <span> <h> or drag images here.</h> </span>
     </div>
    );
  }
}


export default PhotoUpload;
