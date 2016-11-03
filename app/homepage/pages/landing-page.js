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
				<a onClick={this.onLogout}>Logout</a>
				<p>User home page</p>
				<p>{profile.email}</p>
				<p>{profile.username}</p>
			</div>
		)
	}
}


export default connect(mapStateToProps)(HomeView);
