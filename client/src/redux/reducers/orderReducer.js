import {
  MARK_ORDER_STATUS_SUCCESS,
  MARK_ORDER_STATUS_REQUEST,
  MARK_ORDER_STATUS_ERROR,
  SET_ORDER_SUCCESS,
  SET_ORDER_REQUEST,
  SET_ORDER_ERROR,
} from "../types";
import { LOADING, IDLE, SUCCESS, ERROR } from "../../constants/uiState";

const initialState = {
  orders: [],
  orderReducerStatus: IDLE,
  error: "",
  loadingOrder: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ORDER_REQUEST: {
      return {
        ...state,
        orderReducerStatus: LOADING,
        error: initialState.error,
      };
    }
    case SET_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        orderReducerStatus: SUCCESS,
        error: initialState.error,
      };
    case SET_ORDER_ERROR: {
      return {
        ...state,
        orderReducerStatus: ERROR,
        error: action.payload,
      };
    }
    case MARK_ORDER_STATUS_REQUEST: {
      return {
        ...state,
        orderReducerStatus: LOADING,
        error: initialState.error,
        loadingOrder: action.payload
      };
    }
    case MARK_ORDER_STATUS_SUCCESS: {
      return {
        ...state,
        orderReducerStatus: SUCCESS,
        error: initialState.error,
        loadingOrder: initialState.loadingOrder
      };
    }
    case MARK_ORDER_STATUS_ERROR: {
      return {
        ...state,
        orderReducerStatus: ERROR,
        error: action.payload,
        loadingOrder: initialState.loadingOrder
      };
    }
    default:
      return state;
  }
}
