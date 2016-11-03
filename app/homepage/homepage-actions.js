import axios from "axios";
import { fromJS } from "immutable";

export const FETCH_USER = "FETCH_USER";


export const fetchUser = (user) => ({
  type: FETCH_USER,
  user
});

export const fetchUserApi = () => async dispatch => {
  try {
    if (typeof window === "undefined") {
      console.log("(window is undefined)");
      return;
    }
    const response = await axios.get(`/api/user`);
    dispatch(fetchUser(fromJS(response.data)));
  } catch (error) {
    console.trace(error);
  }
};
