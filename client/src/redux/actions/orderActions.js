import { SET_ORDER } from "../types";

export const setOrder = (orders) => (dispatch) => {
  dispatch({
    type: SET_ORDER,
    payload: orders,
  });
};
