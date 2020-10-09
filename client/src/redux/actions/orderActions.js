import {
  SET_ORDER_SUCCESS,
  SET_ORDER_REQUEST,
  SET_ORDER_ERROR,
  MARK_ORDER_STATUS_REQUEST,
  MARK_ORDER_STATUS_SUCCESS,
  MARK_ORDER_STATUS_ERROR,
} from "../types";
import {
  markOrderComplete,
  markOrderCanceled,
  getAllOrder,
} from "../../firebase/firebase";
import ProductTab from "../../components/AdminDashboardMenu/ProductTab/ProductTab";

export const setOrder = () => async (dispatch) => {
  // dispatch({
  //   type: SET_ORDER,
  //   payload: orders,
  // });
  try {
    setOrderRequest(dispatch);
    const orders = await getAllOrder();
    setOrderSuccess(dispatch, orders);
  } catch (error) {
    setOrderError(dispatch, error);
  }
};
export const setOrderRequest = (dispatch) => {
  dispatch({
    type: SET_ORDER_REQUEST,
  });
};
export const setOrderSuccess = (dispatch, orders) => {
  dispatch({
    type: SET_ORDER_SUCCESS,
    payload: orders,
  });
};
export const setOrderError = (dispatch, error) => {
  dispatch({
    type: SET_ORDER_ERROR,
    payload: error,
  });
};
export const markComplete = (orderId) => async (dispatch) => {
  markOrderStatusRequest(dispatch);
  await markOrderComplete(orderId);
  markOrderStatusSucces(dispatch);
};
export const markOrderStatusRequest = (dispatch) => {
  dispatch({
    type: MARK_ORDER_STATUS_REQUEST,
  });
};
export const markOrderStatusSucces = (dispatch) => {
  dispatch({
    type: MARK_ORDER_STATUS_SUCCESS,
  });
};
export const markOrderStatusError = (dispatch, error) => {
  dispatch({
    type: MARK_ORDER_STATUS_ERROR,
    payload: error,
  });
};
export const markCancel = (orderId) => async (dispatch) => {
  try {
    markOrderStatusRequest(dispatch);
    await markOrderCanceled(orderId);
    markOrderStatusSucces(dispatch);
  } catch (error) {
    console.log(error);
    markOrderStatusError(dispatch, error);
  }
};
