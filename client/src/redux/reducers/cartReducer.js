import { ADD_TO_CART } from "../types";

const initialState = {
  products: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        products: [...action.payload],
      };
    }
    default:
      return state;
  }
}
