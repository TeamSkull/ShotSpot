import React from 'react';
import Index from './index.jsx'
import { Link } from 'react-router-dom'

class Navigation extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className = "NavBar">
        <Link to={'/'}>Home</Link>
        <Link to={'/ImageUpload'}>Upload Photo </Link>
        <Link to={'/SignIn'}>Sign Up</Link>
        <Link to={'/Login'}>Sign In</Link>
      </div>
    )
  }
}

export default Navigation;