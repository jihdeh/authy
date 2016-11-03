import React, {PropTypes} from "react";
import IPropTypes from "react-immutable-proptypes";
import compose from "recompose/compose";
import setPropTypes from "recompose/setPropTypes";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import setDisplayName from "recompose/setDisplayName";
import {Row, Col, Input, Button} from "react-materialize";
import withState from "recompose/withState";
import withHandlers from "recompose/withHandlers";
import {Link} from "react-router";
import axios from "axios";

const submitForm = props => async event => {
	event.preventDefault();
		try {
			const response = await axios.post("api/login/session/verify", {code: props.code});
			if(response.data && response.status === 200) {
				window.location = `${window.location.protocol}//${window.location.host}`;
			}
		} catch(err) {
			props.onSubmit("Error Occured / Invalid Token");
		};
}

const enhance = compose(
	setDisplayName("OneTimeAuthy"),
	onlyUpdateForPropTypes,
	setPropTypes({
		onEnterAuthyCode: PropTypes.func,
	}),
	withState("code", "onEnterAuthyCode", ""),
	withState("submitMessage", "onSubmit", ""),
	withHandlers({submitForm})
);

const OneTimeAuthy = enhance(({
	code,
	onEnterAuthyCode,
	submitForm,
	submitMessage
}) => {
	return (
		<div>
			<form onSubmit={submitForm}>
				<Row>
			    <Input type="number" value={code} label="Code" s={12}  onChange={evt => onEnterAuthyCode(evt.target.value)} />
			    <Button waves="light" disabled={code === ""}>Submit</Button>
			    <p>{submitMessage}</p>
				</Row>
			</form>
			<Link to="/login">Go back to Login</Link>
		</div>
	)
});

export default OneTimeAuthy;
