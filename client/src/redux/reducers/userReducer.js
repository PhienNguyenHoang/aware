import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  GET_USER_REQUEST,
  SIGNUP_ERROR,
  RESET_USER_STATUS,
  RESET_USER_ERROR,
} from "../types";
import { LOADING, IDLE, ERROR, SUCCESS } from "../../constants/uiState";
const initialState = {
  credentials: {},
  authenticated: false,
  status: IDLE,
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        authenticated: true,
        credentials: action.payload.credentials,
        status: SUCCESS,
        error: initialState.error,
      };
    }
    case SET_AUTHENTICATED: {
      return {
        ...state,
        authenticated: true,
      };
    }
    case SET_UNAUTHENTICATED: {
      return initialState;
    }
    case SIGNUP_REQUEST: {
      return {
        ...state,
        status: LOADING,
        error: initialState.error,
      };
    }
    case SIGNUP_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case RESET_USER_STATUS: {
      return {
        ...state,
        status: initialState.status,
      };
    }
    case RESET_USER_ERROR: {
      return {
        ...state,
        error: initialState.error,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        status: LOADING,
      };
    }
    default:
      return state;
  }
}
