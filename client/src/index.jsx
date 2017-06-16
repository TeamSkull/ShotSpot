
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Main from './Main.jsx';
import TilePage from './TilePage.jsx';
import ImageUpload from './ImageUpload.jsx';
import PhotoUpload from './PhotoUpload.jsx';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import IndivComponent from './IndivComponent.jsx';
import Filter from './Filter.jsx';
import BigMap from './BigMap.jsx';
import Banner from './Banner.jsx';
import Logout from './Logout.jsx';
import { BrowserRouter as Router,
         Route,
         Link
} from 'react-router-dom';



class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Banner />
        <Main />
      </div>
    );
  }
}

export default Index;


ReactDOM.render(
<Router>
  <div>
    <Route exact path="/" component={Index} />
    <Route path="/TilePage/:id" component={TilePage} />
    <Route path="/Location/:id" component={IndivComponent} />
    <Route path="/ImageUpload/:id" component={ImageUpload} />
    <Route path="/PhotoUpload" component={PhotoUpload} />
    <Route path="/Signup" component={SignUp} />
    <Route path="/Login" component={Login} />
    <Route path="/BigMap/:id" component={BigMap} />
    <Route path="/Logout" component={Logout} />
  </div>
</Router>
, document.getElementById('app'));
