import { ADD_TO_CART, SET_CART_LOGIN, SET_UNAUTHENTICATED } from "../types";

const initialState = {
  count: 0,
  products: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        count: state.count + action.payload.quantity,
        products: [action.payload,...state.products],
      };
    }
    case SET_CART_LOGIN: {
      return {
        count: action.payload.count,
        products: action.payload.products
      }
    }
    case SET_UNAUTHENTICATED: {
      return initialState;
    }
    default:
      return state;
  }
}
