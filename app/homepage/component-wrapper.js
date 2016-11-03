import React, {Component} from "react"; 
import frontPage from "../../decorators/frontpage";
import {Preloader} from "react-materialize";

@frontPage()
class ComponentWrapper extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		if (!this.props.children) {
			return <h1 style={{marginTop: 88}}>404</h1>
		}
		return (
			<div className="top-wrapper">
				{typeof document === "undefined" ? <Preloader flashing size="big"/> : this.props.children }
			</div>
		)
	}
}

export default ComponentWrapper;
