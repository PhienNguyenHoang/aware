import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../types";

const initialState = {
  credentials: {},
  authenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      return {
        authenticated: true,
        ...action.payload,
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

    default:
      return state;
  }
}
