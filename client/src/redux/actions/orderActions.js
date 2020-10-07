import { SET_ORDER, MARK_COMPLETE_REQUEST, MARK_COMPLETE_SUCCESS } from "../types";
import { markOrderComplete } from "../../firebase/firebase";

export const setOrder = (orders) => (dispatch) => {
  dispatch({
    type: SET_ORDER,
    payload: orders,
  });
};
export const markComplete = (orderId) => async (dispatch) => {
  markCompleteRequest(dispatch);
  await markOrderComplete(orderId);
  markCompleteSuccess(dispatch);
}
export const markCompleteRequest = dispatch => {
  dispatch({
    type: MARK_COMPLETE_REQUEST
  })
}
export const markCompleteSuccess = dispatch => {
  dispatch({
    type: MARK_COMPLETE_SUCCESS,
  })
}