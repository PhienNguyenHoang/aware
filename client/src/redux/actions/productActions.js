import { SET_CATEGORY } from "../types";
import { getCategoryByCustomerTypeAndType } from "../../firebase/firebase";

export const getCategory = (category) => dispatch => {
    dispatch({
        type: SET_CATEGORY,
        payload: category, 
    });
}