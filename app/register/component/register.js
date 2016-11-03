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

const changeUsername = props => (value) => {
// onEnterName
const userName = !validator.isEmpty(value.trim());
	props.onEnterName(value);
	return !userName ? props.onUserNameError("Invalid Username") : props.onUserNameError(null);
};

function handleInputBlur(telNumber, selectedCountry) {
  console.log('Focus off the ReactTelephoneInput component. Tel number entered is: ', telNumber, ' selected country is: ', selectedCountry);
}

const handleInputChange = props => (value, telNumber, selectedCountry) => {
	console.log('input changed. number: ', telNumber, 'selected value: ', value);
	// props.onEnterNumber(value);
}

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
	// const userPassword = !validator.isEmpty(value.trim());
	props.onEnterNumber(value);
	// return !userPassword ? props.onPasswordError("Please enter password") : props.onPasswordError(null);
};
const changeCode = props => (value) => {
	props.onEnterCountryCode(value);
	// return !userPassword ? props.onPasswordError("Please enter password") : props.onPasswordError(null);
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
	countryCode,
	phoneNumber,
	onEnterCountryCode,
	onEnterNumber,
	submitMessage
}) => {
	return (
		<div>
			<form onSubmit={submitForm}>
				<Row>
			    <Input s={12} label="Name" value={username} onChange={evt => changeUsername(evt.target.value)}/>
			    <p style={{color: "red"}}>{usernameError}</p>

			    <Input s={4} label="Country Code" value={countryCode} onChange={evt => onEnterCountryCode(evt.target.value)}/>
			    <Input s={8} label="Phone Number" value={phoneNumber} onChange={evt => onEnterNumber(evt.target.value)}/>
			    <Input type="email" value={email} label="Email" s={12}  onChange={evt => changeEmail(evt.target.value)} />
			    <p style={{color: "red"}}>{emailError}</p>
			    <Input type="password" value={password} min="4" label="password" s={12} onChange={evt => changePassword(evt.target.value)} />
			    <p style={{color: "red"}}>{passwordError}</p>
			    <Button waves="light">Register</Button>
			    <p>{submitMessage}</p>
				</Row>
			</form>
		</div>
	)
});

export default Register;
