import React from "react";
import {Route, IndexRoute, Router, browserHistory} from "react-router";
import App from "./app";
import { connect } from "react-redux";
import HomeView from "./homepage";
import { 
	fetchUserApi
} from "./homepage/homepage-actions";

import LoginComponent from "./login/component/login";
import VerifyComponent from "./login/component/one-time-authy";
import RegisterComponent from "./register/component/register";
import SuccessComponent from "./register/component/successful-registration";

class NoMatch extends React.Component {
  render() {
    return (
      <div>
        <h2>No Match</h2>
        <div> 404 Error</div>
      </div>
    )
  }
}

const JadoPadoRouter = ({
  history,
  dispatch
}) => (
	  <Router history={ history }>
	    <Route path="/" component={App}>
	      <IndexRoute
	        component={HomeView}
	        onEnter={() => dispatch(fetchUserApi())}
	        />
	        <Route
	        	path="login"
	        	component={LoginComponent} />
	        <Route
	        	path="verify"
	        	component={VerifyComponent} />
	        <Route 
	        	path="register"
	        	component={RegisterComponent}/>
	        <Route 
	        	path="success"
	        	component={SuccessComponent}/>
		      <Route path="*" component={NoMatch} />
	    </Route>
	  </Router>
);

export default connect()(JadoPadoRouter);

