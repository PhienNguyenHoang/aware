import axios from "axios";

import { SET_USER } from "../types";

export const signupUser = (userData) => async (dispatch) => {
    console.log('signing up')
  const returnedData = await axios.post("/signup", userData);
  setAuthorizationHeader(returnedData.data.token);
  dispatch(getUserData());
};

export const getUserData = () => async (dispatch) => {
  const returnedUserData = await axios.get("/user");
  console.log(returnedUserData.data);
  dispatch({
    type: SET_USER,
    payload: returnedUserData.data,
  });
};

const setAuthorizationHeader = (token) => {
  const FBIdtoken = `Bearer ${token}`;
  localStorage.setItem("FBIdtoken", FBIdtoken);
  axios.defaults.headers.common["Authorization"] = FBIdtoken;
};
