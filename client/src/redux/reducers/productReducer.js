import { SET_PRODUCT, FILTER_PRODUCT_BY_CATEGORY, CLEAR_FILTER_CATEGORY, SET_ONE_PRODUCT } from "../types";

const initialState = {
    products: [],
    category: '',
    product: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
      case SET_PRODUCT: {
          return {
              ...state,
              products: [...action.payload],
              product: initialState.product
          }
      }
      case SET_ONE_PRODUCT: {
          return {
            ...state,
            products: initialState.products,
            product: action.payload
          }
      }
      case FILTER_PRODUCT_BY_CATEGORY: {
          return {
              ...state,
              category: action.payload
          }
      }
      case CLEAR_FILTER_CATEGORY: {
            return {
                ...state,
                category: ''
            }
      }
      default:
        return state;
    }
  }