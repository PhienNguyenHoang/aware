import { ADD_TO_CART, SET_CART_LOGIN } from "../types"

export const addItemToCart = (productDetails) => dispatch => {
    console.log(productDetails);
    dispatch({
        type: ADD_TO_CART,
        payload: productDetails,
    })
}

export const setCartAtLogin = (product) => dispatch => {
    let count = 0;
    console.log(product)
   if(product){
    product.products.forEach(item => {
        count += item.quantity 
    })
    console.log(count)
    const payloadObj = {
        count: count,
        products: product.products
    }
    dispatch({
        type: SET_CART_LOGIN,
        payload: payloadObj
    })
   }
}