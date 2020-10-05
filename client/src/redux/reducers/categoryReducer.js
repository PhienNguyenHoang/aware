import { SET_CATEGORY, CHOOSE_CATEGORY, CLEAR_CHOSEN_CATEGORY } from "../types";

const initialState = {
    categories: [],
    categoryChosen: ""
}

export default function (state = initialState, action) {
    switch (action.type) {
      case SET_CATEGORY: {
          return {
              ...state,
              categories: [...action.payload]
          }
      }
      case CHOOSE_CATEGORY: {
          return {
            ...state,
            categoryChosen: action.payload
          }
      }
      case CLEAR_CHOSEN_CATEGORY: {
          return {
              ...state,
              categoryChosen: initialState.categoryChosen
          }
      }
      default:
        return state;
    }
  }