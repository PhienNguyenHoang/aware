import { SET_CATEGORY, CHOOSE_CATEGORY, CLEAR_CHOSEN_CATEGORY } from "../types";

export const getCategory = (category) => dispatch => {
    dispatch({
        type: SET_CATEGORY,
        payload: category, 
    });
}
export const chooseCategory = (categoryChosen) => dispatch => {
    dispatch({
        type: CHOOSE_CATEGORY,
        payload: categoryChosen
    })
}
export const clearChosenCategory = () => dispatch => {
    dispatch({
        type: CLEAR_CHOSEN_CATEGORY,
    })
}