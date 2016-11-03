import React, {PropTypes} from "react";
import IPropTypes from "react-immutable-proptypes";
import compose from "recompose/compose";
import setPropTypes from "recompose/setPropTypes";
import withState from "recompose/withState";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import setDisplayName from "recompose/setDisplayName";
import withHandlers from "recompose/withHandlers";
import {Row, Col, Input, Button} from "react-materialize";
import axios from "axios";
import validator from "validator";
import ReactTelInput from "react-telephone-input";
import {Link} from "react-router";

const changeUsername = props => (value) => {
const userName = !validator.isEmpty(value.trim());
	props.onEnterName(value);
	return !userName ? props.onUserNameError("Invalid Username") : props.onUserNameError(null);
};

const changeEmail = props => (value) => {
	const userEmail = validator.isEmail(value.trim()) &&
		!validator.isEmpty(value);
		props.onEnterEmail(value);
		return !userEmail ? props.onEmailError("Invalid Email") : props.onEmailError(null);
};
const changePassword = props => (value) => {
	const userPassword = !validator.isEmpty(value.trim());
	props.onEnterPassword(value);
	return !userPassword ? props.onPasswordError("Please enter password") : props.onPasswordError(null);
};
const changeNumber = props => (value) => {
	const userNumber = !validator.isEmpty(value.trim());
	props.onEnterNumber(value);
	return !userNumber ? props.onNumberError("Please enter your phone number") : props.onNumberError(null);
};
const changeCode = props => (value) => {
	const userCode = !validator.isEmpty(value.trim());
	props.onEnterCountryCode(value);
	return !userCode ? props.onCodeError("Please enter a valid country code") : props.onCodeError(null);
};

const submitForm = props => async event => {
	event.preventDefault();
	if(props.emailError || props.usernameError || props.passwordError) {
		props.onSubmit("Cannot register due to errors in form, please rectify");
	} else {
		try {
			const response = await axios.post("api/register", {
					username: props.username,
					email: props.email,
					countryCode: props.countryCode,
					phoneNumber: props.phoneNumber,
					password: props.password
				});
			if(response.data && response.status) {
				window.location = `${window.location.protocol}//${window.location.host}/login`;
			}
		} catch(err) {
			props.onSubmit("Registration not successful, please try a different email");
		};
	}
}

const styles = {
	topDiv: {
		width: "60%",
    margin: "0 auto"
	}
}

const enhance = compose(
	setDisplayName("Register"),
	onlyUpdateForPropTypes,
	setPropTypes({
		onEnterName: PropTypes.func,
		onEnterEmail: PropTypes.func,
		onEnterPassword: PropTypes.func,
		onEnterCountryCode: PropTypes.func,
		onEnterNumber: PropTypes.func,
	}),
	withState("username", "onEnterName", ""),
	withState("usernameError", "onUserNameError", true),
	withState("emailError", "onEmailError", true),
	withState("passwordError", "onPasswordError", true),
	withState("numberError", "onNumberError", true),
	withState("codeError", "onCodeError", true),
	withState("email", "onEnterEmail", ""),
	withState("password", "onEnterPassword", ""),
	withState("submitMessage", "onSubmit", ""),
	withState("phoneNumber", "onEnterNumber", ""),
	withState("countryCode", "onEnterCountryCode", ""),
	withHandlers({
		changeUsername,
		changeEmail,
		changePassword,
		submitForm,
		changeCode,
		changeNumber
	})
);

const Register = enhance(({
	changeUsername,
	changeEmail,
	changePassword,
	username,
	email,
	password,
	submitForm,
	emailError,
	usernameError,
	passwordError,
	numberError,
	codeError,
	countryCode,
	phoneNumber,
	changeCode,
	changeNumber,
	submitMessage
}) => {
	return (
		<div style={styles.topDiv}>
			<form>
				<Row>
			    <Input s={12} label="Name" value={username} onChange={evt => changeUsername(evt.target.value)}/>
			    <p style={{color: "red"}}>{usernameError}</p>

			    <Input s={4} type="number" label="Country Code" value={countryCode} max="3" onChange={evt => changeCode(evt.target.value)}/>
			    <Input s={8} label="Phone Number" type="number" value={phoneNumber} onChange={evt => changeNumber(evt.target.value)}/>
		    	<p>Phone Number: +{countryCode || "000"}-{phoneNumber || "-000-0000"}</p>
			    <p style={{color: "red"}}>{codeError}</p>
			    <p style={{color: "red"}}>{numberError}</p>
			    <Input type="email" value={email} label="Email" s={12}  onChange={evt => changeEmail(evt.target.value)} />
			    <p style={{color: "red"}}>{emailError}</p>
			    <Input type="password" value={password} min="4" label="password" s={12} onChange={evt => changePassword(evt.target.value)} />
			    <p style={{color: "red"}}>{passwordError}</p>
			    <Button waves="light" style={{display: "inline-block"}} onClick={submitForm} disabled={
			    	username =="" || email === "" || password === ""
			    }>Register</Button>
					<Button waves="light" style={{float: "right", backgroundColor: "white", boxShadow: "none"}}><Link to="/login">Login</Link></Button>
			    <p>{submitMessage}</p>
				</Row>
			</form>
		</div>
	)
});

export default Register;
