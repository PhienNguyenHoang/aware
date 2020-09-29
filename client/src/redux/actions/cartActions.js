import { ADD_TO_CART } from "../types"

export const addItemToCart = (productDetails) => dispatch => {
    console.log(productDetails);
    dispatch({
        type: ADD_TO_CART,
        payload: productDetails,
    })
}