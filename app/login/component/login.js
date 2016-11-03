import React, {PropTypes} from "react";
import IPropTypes from "react-immutable-proptypes";
import compose from "recompose/compose";
import setPropTypes from "recompose/setPropTypes";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import setDisplayName from "recompose/setDisplayName";
import {Row, Col, Input, Button} from "react-materialize";
import withState from "recompose/withState";
import withHandlers from "recompose/withHandlers";
import axios from "axios";
import {Link} from "react-router";

const submitForm = props => async event => {
	event.preventDefault();
		try {
			const response = await axios.post("api/login/session", {
					email: props.email,
					password: props.password
				});
			if(response.data && response.status === 200 && response.data.trigger) {
				props.approveAuthy(response.data.message);
				function checkTouch() {
					axios.get(`api/login/authy/status?X-API-TOKEN=${response.headers.token}`).then((response) => {
						if (response.data.status == "approved") {
							window.location = `${window.location.protocol}//${window.location.host}`;
          	} else if (response.data.status == "denied") {
              window.location = `${window.location.protocol}//${window.location.host}/verify`;
            }
            else {
		          setTimeout(checkTouch(), 6000);
		        }
					});
				}
				checkTouch();
			} else if(!response.data.trigger){
				window.location = `${window.location.protocol}//${window.location.host}/verify`;
			}
		} catch(err) {
			props.onSubmit("Error Logging In, Please check email/password");
		};
}

const enhance = compose(
	setDisplayName("Login"),
	onlyUpdateForPropTypes,
	setPropTypes({
		onEnterEmail: PropTypes.func,
		onEnterPassword: PropTypes.func
	}),
	withState("email", "onEnterEmail", ""),
	withState("password", "onEnterPassword", ""),
	withState("submitMessage", "onSubmit", ""),
	withState("approvalMsg", "approveAuthy", ""),
	withHandlers({submitForm})
);

const Login = enhance(({
	email,
	password,
	onEnterPassword,
	onEnterEmail,
	submitForm,
	submitMessage,
	approvalMsg,
}) => {
	return (
		<div>
			<h3>{approvalMsg}</h3>
			<form>
				<Row>
			    <Input type="email" value={email} label="Email" s={12}  onChange={evt => onEnterEmail(evt.target.value)} />
			    <Input type="password" value={password} min="4" label="password" s={12} onChange={evt => onEnterPassword(evt.target.value)} />
			    <Button waves="light" disabled={email === "" || password === ""} style={{display: "inline-block"}}  onClick={submitForm}>Login</Button>
					<Button waves="light" waves="light" style={{float: "right", backgroundColor: "white", boxShadow: "none"}}><Link to="/register">Register</Link></Button>
			    <p>{submitMessage}</p>
				</Row>
			</form>
		</div>
	)
});

export default Login;
