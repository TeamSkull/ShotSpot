import React from 'react'
import axios from 'axios'

class Login extends React.Component {
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
      url: '/login',
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
      <div id='signin' className="ui input focus">
      <h1 id="sign-in-title">Sign In </h1>
      <form id="login">
        <h id="username"> username </h>
        <div></div>
        <input ref="username" type="text" placeholder="" id="username-login"onChange={this.handleUserName.bind(this)}></input>
        <div></div>
        <h id="password"> password </h>
        <div></div>
        <input ref="password" type="password" placeholder="" id="password-login"onChange={this.handlePassword.bind(this)}></input>
        <div></div>
        <input className="ui blue button"onClick={this.handleSubmit} type="submit" value="SIGN IN" id="login-button"></input>
      </form>
      </div>

    );
  }
}

export default Login