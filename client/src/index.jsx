
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Main from './Main.jsx';
import TilePage from './TilePage.jsx';
import ImageUpload from './ImageUpload.jsx';
import SignIn from './SignIn.jsx';
import Login from './Login.jsx';
import IndivComponent from './IndivComponent.jsx'
import BigMap from './BigMap.jsx';
import Banner from './Banner.jsx';
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
    <Route path="/ImageUpload" component={ImageUpload} />
    <Route path="/SignIn" component={SignIn} />
    <Route path="/Login" component={Login} />
    <Route path="/BigMap/:id" component={BigMap} />
  </div>
</Router>
, document.getElementById('app'));
