import { Map } from "immutable";
import { set } from "../../util/functional-immutable";
import {
  FETCH_USER
} from "./homepage-actions";


const initialState  = new Map();

const HomepageReducer = (state = initialState, action) => {
	switch(action.type) {
		case FETCH_USER:
			return set("user", action.user, state);
		default:
			return state;
	}
}


export default HomepageReducer;
