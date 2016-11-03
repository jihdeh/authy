import React, {PropTypes, Component} from "react";
import {Row, Col, Input, Button} from "react-materialize";
import axios from "axios";
import validator from "validator";
import {Link} from "react-router";

const styles = {
	topDiv: {
		width: "60%",
    margin: "0 auto"
	}
}

class SuccessFulReg extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div style={styles.topDiv}>
				<p> You have successfully registered, please <Link to="/login">Login</Link> </p>
				<p>Make sure to download the app "AUTHY" to your Android or IOS device, to retrive your one time token</p>
			</div>
		)
	}
}

export default SuccessFulReg;
