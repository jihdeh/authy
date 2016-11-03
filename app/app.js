import React from "react";
import frontPage from "./decorators/frontpage";
import {Preloader} from "react-materialize";

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

@frontPage()
class App extends React.Component {

  componentDidMount() {
  	//TODO: add something to load on app refresh
  }

  render() {
  	if (!this.props.children) {
			return <h1 style={{marginTop: 88}}>404</h1>
		}
    return (
      <div id="app">
        {this.props.children }
      </div>
    );
  }
}

export default App;
