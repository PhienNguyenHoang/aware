import { SET_ORDER } from "../types";

const initialState = {
  orders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ORDER:
      return {
        orders: action.payload,
      };
    default:
      return state;
  }
}
