import { SET_PRODUCT, FILTER_PRODUCT_BY_CATEGORY, CLEAR_FILTER_CATEGORY } from "../types";

const initialState = {
    products: [],
    category: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
      case SET_PRODUCT: {
          return {
              products: [...action.payload]
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