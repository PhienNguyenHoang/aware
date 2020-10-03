import axios from "axios";

import {
  SET_USER,
  SET_UNAUTHENTICATED,
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  GET_USER_REQUEST,
  SIGNUP_ERROR,
  RESET_USER_STATUS,
  RESET_USER_ERROR,
} from "../types";
import { FBIdToken } from "../../constants/localStorage";

export const signupUser = (userData) => async (dispatch) => {
  try {
    console.log("signing up");
    signupUserRequest(dispatch);
    const returnedData = await axios.post("/signup", userData);
    setAuthorizationHeader(returnedData.data.token);
    dispatch(getUserData());
  } catch (error) {
    console.log("error log", error.response.data);
    signupUserError(dispatch, error.response.data);
  }
};
export const signupUserRequest = (dispatch) => {
  dispatch({
    type: SIGNUP_REQUEST,
  });
};
export const signupUserError = (dispatch, error) => {
  dispatch({
    type: SIGNUP_ERROR,
    payload: error,
  });
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
export const resetUserStatus = (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: RESET_USER_STATUS,
    });
  }, 3000);
};
export const getUserDataRequest = (dispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
  });
};
export const resetUserError = () => (dispatch) => {
  dispatch({
    type: RESET_USER_ERROR,
  });
};

export const getUserData = () => async (dispatch) => {
  try {
    getUserDataRequest(dispatch);
    const returnedUserData = await axios.get("/user");

    dispatch({
      type: SET_USER,
      payload: returnedUserData.data,
    });
    resetUserStatus(dispatch);
  } catch (error) {
    throw error;
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
