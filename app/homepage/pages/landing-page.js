import React, {PropTypes, Component} from "react";
import compose from "recompose/compose";
import IPropTypes from "react-immutable-proptypes";
import setDisplayName from "recompose/setDisplayName";
import setPropTypes from "recompose/setPropTypes";
import { connect } from "react-redux";
import {toJS} from "immutable";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import {
	fetchUserApi
} from "../homepage-actions";
import RegisterForm from "../../register/component/register";
import axios from "axios";
import {Button, Row} from "react-materialize";


const mapStateToProps = (state, props) => ({
	user: state.get("user"),
});

class HomeView extends Component {
	static propTypes = {
		user: IPropTypes.map
	}
	constructor(props) {
		super(props);
		this.onLogout = this.onLogout.bind(this);
	}
	onLogout = async () => {
		const response = await axios.delete("/api/login/session");
		if(response.status === 200) {
			window.location = "/login";
		}
	}
	render() {
		const {user} = this.props;
		const profile = Object.assign({}, user.toJS());
		return (
			<div>
				<Row>
					<Button waves="light" waves="light" style={{float: "right", backgroundColor: "white", boxShadow: "none"}}><a onClick={this.onLogout}>Logout</a></Button>
					<p>User home page</p>
					<p>Email: {profile.email}</p>
					<p>Your Name: {profile.username}</p>
				</Row>
			</div>
		)
	}
}


export default connect(mapStateToProps)(HomeView);
