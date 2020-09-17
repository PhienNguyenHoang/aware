import { SET_USER } from "../types";

const initialState = {
  credentials: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
