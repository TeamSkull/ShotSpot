import React from 'react';
import axios from 'axios';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {comments: 'Can you see this comment?'};
  }

  render() {
    return (
      <div className="container-fluid">
        <h3 className="commentText"> Comments </h3>
        {(this.props.comments) ? this.props.comments.map((comments, i) => {
          return (
            <div key={i}>
              <a className="username"> <i className="user icon"></i>{comments.username} </a>
              <h3 className="user-comment"> {comments.content}</h3>
            </div>
          );
        }) : console.log('There are no comments yet for this location')}
      </div>
    );
  }
}

export default Comments;