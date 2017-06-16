import React from 'react';
import axios from 'axios';
import Index from './index.jsx';
import { Redirect } from 'react-router';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {trigger: false}
  }

  componentDidMount(){
    axios({
      url: '/logout',
      method: 'POST',
      data: "ping!"
    }).then((result) => {
      console.log(result, ' :This is the result of the logout call')
    }).catch((error) => {
      console.log(error, ' :This is the error from the logout axios call');
    })
    setTimeout(
      function(){
        this.setState({trigger: true})
      }.bind(this) , 3000
    )
    
  }

  render() {
    if(this.state.trigger) {
      return <Redirect push to={'/'} />
    }
    return(
     <div id="logout">
      <h1 id="bye-text"> See you soon! </h1>
     </div>
    )
  }
}

export default Logout;