import React from 'react';
import axios from 'axios';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {comments: 'Can you see this comment?', username: 'req.session.user', usercomment: '', locationId: ''};
    this.handleuserComment = this.handleuserComment.bind(this);
    this.oncommentSubmit = this.oncommentSubmit.bind(this);
  }

  handleuserComment (e) {
    this.setState({usercomment: e.target.value});
  }

  oncommentSubmit() {
    let postedComment = {};
    postedComment.username = this.props.sessionUser;
    postedComment.content = this.state.usercomment;
    postedComment.locationId = this.props.locId;
    axios({
      url: '/locationPage/postComment',
      method: "POST",
      data: postedComment
    }).then((result) => {
      console.log('The comment has been successfully sent to the controller: ', result)
    }).catch((error) => {
      console.log('There is an error in posting the comment: ', error);
    })
  }

  render() {
    return (
      <div className="container-fluid" id="comments">
        <h3 className="commentText"> Comments </h3>
        <form className= "ui input" id="comment-form">
          <input placeholder="Have a tip about this location? Add here!" type="text" className="commentBlock" onChange={this.handleuserComment}></input>
          <input onClick = {this.oncommentSubmit} className="ui blue button" type="submit" value="Add Comment" ></input>
        </form>
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