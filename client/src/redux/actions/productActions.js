import { SET_PRODUCT, FILTER_PRODUCT_BY_CATEGORY, SET_ONE_PRODUCT } from "../types";
import { getOneProduct } from "../../firebase/firebase";

export const getProduct = (products) => (dispatch) => {
  dispatch({
    type: SET_PRODUCT,
    payload: products,
  });
};
export const getSpecificProduct = (productName) => async (dispatch) => {
  const product = await getOneProduct(productName);
  console.log("actions", product)
  dispatch({
    type: SET_ONE_PRODUCT,
    payload: product
  })
}
export const getChosenCategory = (payload) => (dispatch) => {
  dispatch({  
    type: FILTER_PRODUCT_BY_CATEGORY,
    payload: payload,
  });
};
