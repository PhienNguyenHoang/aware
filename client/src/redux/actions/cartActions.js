import {
  ADD_TO_CART,
  SET_CART_LOGIN,
  CLEAR_CART,
  UNAUTHENTICATED_ADD_TO_CART,
  SET_UNAUTHENTICATED_CART,
} from "../types";

export const addItemToCart = (productDetails) => (dispatch) => {
  console.log(productDetails);
  dispatch({
    type: ADD_TO_CART,
    payload: productDetails,
  });
};
export const unAuthAddItemToCart = (productDetails) => (dispatch) => {
  dispatch({
    type: UNAUTHENTICATED_ADD_TO_CART,
    payload: productDetails,
  });
};
export const setUnauthenticatedCart = (localStorageProducts) => (dispatch) => {
  let count = 0;
  localStorageProducts.forEach((item) => {
    count += item.quantity;
  });
  const payloadObj = {
    count: count,
    products: localStorageProducts,
  };
  dispatch({
    type: SET_UNAUTHENTICATED_CART,
    payload: payloadObj,
  });
};
export const setCartAtLogin = (product) => (dispatch) => {
  let count = 0;
  console.log(product);
  if (product) {
    product.products.forEach((item) => {
      count += item.quantity;
    });
    console.log(count);
    const payloadObj = {
      count: count,
      products: product.products,
    };
    dispatch({
      type: SET_CART_LOGIN,
      payload: payloadObj,
    });
  }
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
};
