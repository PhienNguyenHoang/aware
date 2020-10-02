import { SET_OPEN_LOGIN_MODAL, SET_CLOSE_LOGIN_MODAL } from "../types";

const initialState = {
  isOpenModal: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_OPEN_LOGIN_MODAL: {
      return {
        isOpenModal: true,
      };
    }
    case SET_CLOSE_LOGIN_MODAL:{
        return {
            isOpenModal: false
        }
    }
    default:
      return state;
  }
}
