import { SET_OPEN_LOGIN_MODAL, SET_CLOSE_LOGIN_MODAL } from "../types";

export const openLoginModal = () => (dispatch) => {
    console.log("excute")
  dispatch({
    type: SET_OPEN_LOGIN_MODAL,
  });
};

export const closeLoginModal = () => (dispatch) => {
  dispatch({
    type: SET_CLOSE_LOGIN_MODAL,
  });
};
