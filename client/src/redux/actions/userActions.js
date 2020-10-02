import axios from "axios";

import { SET_USER, SET_UNAUTHENTICATED } from "../types";
import { FBIdToken } from "../../constants/localStorage";

export const signupUser = (userData) => async (dispatch) => {
  console.log("signing up");
  const returnedData = await axios.post("/signup", userData);
  setAuthorizationHeader(returnedData.data.token);
  dispatch(getUserData());
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const returnedData = await axios.post("/login", userData);
    setAuthorizationHeader(returnedData.data.token);
    dispatch(getUserData());
  } catch (error) {
    console.log(error);
  }
};

export const loginAdmin = (adminLoginData, history) => async (dispatch) => {
  const returnedData = await axios.post("/login", adminLoginData);
  setAuthorizationHeader(returnedData.data.token);
  await dispatch(getUserData());
  history.push("/admin/dashboard");
};

export const getUserData = () => async (dispatch) => {
  try {
    const returnedUserData = await axios.get("/user");
    dispatch({
      type: SET_USER,
      payload: returnedUserData.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch({ type: SET_UNAUTHENTICATED });
  localStorage.removeItem(FBIdToken);
};

const setAuthorizationHeader = (token) => {
  const FBIdtoken = `Bearer ${token}`;
  localStorage.setItem(FBIdToken, FBIdtoken);
  axios.defaults.headers.common["Authorization"] = FBIdtoken;
};
