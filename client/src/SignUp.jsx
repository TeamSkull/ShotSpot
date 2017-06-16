import React from 'react'
import axios from 'axios'

class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {username: '', password: ''}
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    let userdata = {};
    userdata.username = this.state.username
    userdata.password = this.state.password
    axios({
      method: "POST",
      url: '/signup',
      data: userdata
    }).then((results) => {
      console.log(results, 'from login results')
    }).catch((error) => {
      console.log(error, 'This is from login');
    })
  }

  handleUserName(e){
    this.setState({username: e.target.value})
  }

  handlePassword(e){
    this.setState({password: e.target.value})
  }


  render(){
    return(
       <div id='signup' className="ui input focus">
        <h1 id="create-an-account">Create An Account</h1>
        <form id="signup-form">
         <h id="username"> username </h>
         <div></div>
          <input ref="username" type="text" placeholder="" id='username-signup'onChange={this.handleUserName.bind(this)}></input>
          <div></div>
          <h id="username"> password </h>
         <div></div>
          <input ref="password" type="password" placeholder="" id='password-signup'onChange={this.handlePassword.bind(this)}></input>
          <div></div>
          <h id="username"> confirm your password </h>
         <div></div>
          <input ref="password" type="password" placeholder="" id='password-signup'onChange={this.handlePassword.bind(this)}></input>
          <div></div>
          <input className="ui blue button" onClick={this.handleSubmit} type="submit" value="SIGN UP" id="signup-button"></input>
        </form>
      </div>
    );
  }
}

export default SignUp