import React, {Component} from "react";
import {Navbar, NavItem} from "react-materialize";

export default function frontPage() {
	return function(Child) {
		return class extends Component {
			constructor(props) {
				super(props);
			}
			
			render() {
				return (
					<div>
						<Navbar brand="JP" right>
						</Navbar>
						<Child {...this.props}/>
					</div>
				)
			}
		}
	}
}
