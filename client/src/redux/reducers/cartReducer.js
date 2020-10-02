import {
  ADD_TO_CART,
  SET_CART_LOGIN,
  CLEAR_CART,
  UNAUTHENTICATED_ADD_TO_CART,
  SET_UNAUTHENTICATED_CART,
  SET_AUTHENTICATED,
} from "../types";
import { bindActionCreators } from "redux";

const initialState = {
  count: 0,
  products: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        count: state.count + action.payload.quantity,
        products: [action.payload, ...state.products],
      };
    }
    case UNAUTHENTICATED_ADD_TO_CART: {
      let localStorageProductArray = [action.payload, ...state.products];
      localStorage.setItem("productsInCart", JSON.stringify(localStorageProductArray));
      return {
        count: state.count + action.payload.quantity,
        products: [action.payload, ...state.products],
      };
    }
    case SET_CART_LOGIN: {
      return {
        count: action.payload.count,
        products: action.payload.products,
      };
    }
    case SET_UNAUTHENTICATED_CART: {
      return {
        count: action.payload.count, 
        products: action.payload.products
      }
    }
    case CLEAR_CART: {
      console.log("unauth");
      return initialState;
    }
    default:
      return state;
  }
}
