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
import {Link, browserHistory} from "react-router";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/libphonenumber.js';
import 'react-intl-tel-input/dist/main.css';

const loadJSONP = (url, callback) => {
  const ref = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.src = `${url + (url.indexOf('?') + 1 ? '&' : '?')}callback=${callback}`;
  ref.parentNode.insertBefore(script, ref);
  script.onload = () => {
    script.remove();
  };
};

const lookup = (callback) => {
  loadJSONP('http://ipinfo.io', 'sendBack');
  window.sendBack = (resp) => {
    const countryCode = (resp && resp.country) ? resp.country : '';
    callback(countryCode);
  }
};
const handleNumber = props => (status, value, countryData, number, id) => {
  let cleanInput = validator.isNumeric(value) && validator.isLength(value, {min: 4, max: 12});;
  props.onEnterCountryCode(countryData.dialCode);
  props.onEnterNumber(value);
  props.userEnteredValue(number);
  !cleanInput ? props.onNumberError("Please enter a valid phone number") : props.onNumberError(null);
};

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
				const path = `${window.location.protocol}//${window.location.host}/success`;
		    browserHistory.push(path)
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
	withState("email", "onEnterEmail", ""),
	withState("password", "onEnterPassword", ""),
	withState("submitMessage", "onSubmit", ""),
	withState("phoneNumber", "onEnterNumber", ""),
	withState("countryCode", "onEnterCountryCode", ""),
	withState("displayUserNumber", "userEnteredValue", ""),
	withHandlers({
		changeUsername,
		changeEmail,
		changePassword,
		submitForm,
		handleNumber
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
	countryCode,
	displayUserNumber,
	phoneNumber,
	handleNumber,
	submitMessage
}) => {
	return (
		<div style={styles.topDiv}>
			<form>
				<Row>
			    <Input s={12} label="Name" value={username} onChange={evt => changeUsername(evt.target.value)}/>
			    <p style={{color: "red"}}>{usernameError}</p>
  				<IntlTelInput onPhoneNumberChange={handleNumber}
											defaultCountry={'auto'}
                      geoIpLookup={lookup}
                      onPhoneNumberBlur={handleNumber}
                      separateDialCode={true}
                      css={['intl-tel-input', 'form-control']}
                      utilsScript={'libphonenumber.js'} />
          <p>{displayUserNumber}</p>
			    <p style={{color: "red"}}>{numberError}</p>
			    <Input type="email" value={email} label="Email" s={12}  onChange={evt => changeEmail(evt.target.value)} />
			    <p style={{color: "red"}}>{emailError}</p>
			    <Input type="password" value={password} min="4" label="password" s={12} onChange={evt => changePassword(evt.target.value)} />
			    <p style={{color: "red"}}>{passwordError}</p>
			    <Button waves="light" style={{display: "inline-block"}} onClick={submitForm} disabled={
			    	username =="" || email === "" || password === "" || numberError
			    }>Register</Button>
					<Button waves="light" style={{float: "right", backgroundColor: "white", boxShadow: "none"}}><Link to="/login">Login</Link></Button>
			    <p>{submitMessage}</p>
				</Row>
			</form>
		</div>
	)
});

export default Register;
