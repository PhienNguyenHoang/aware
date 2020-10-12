import { SET_CATEGORY } from "../types";

export const getCategory = (category) => dispatch => {
    dispatch({
        type: SET_CATEGORY,
        payload: category, 
    });
}
