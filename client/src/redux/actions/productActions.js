import { SET_PRODUCT, FILTER_PRODUCT_BY_CATEGORY } from "../types";

export const getProduct = (products) => (dispatch) => {
  console.log(products)
  dispatch({
    type: SET_PRODUCT,
    payload: products,
  });
};

export const getChosenCategory = (payload) => (dispatch) => {
    console.log(payload)
  dispatch({
    type: FILTER_PRODUCT_BY_CATEGORY,
    payload: payload,
  });
};
