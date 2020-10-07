import { SET_ORDER, MARK_COMPLETE_SUCCESS, MARK_COMPLETE_REQUEST } from "../types";
import { LOADING, IDLE, SUCCESS, ERROR} from  '../../constants/uiState'

const initialState = {
  orders: [],
  orderReducerStatus: IDLE

};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ORDER:
      return {
        ...state,
        orders: action.payload,
      };
      case MARK_COMPLETE_REQUEST: {
        return {
          ...state,
          orderReducerStatus: LOADING
        }
      }
      case MARK_COMPLETE_SUCCESS: {
        return {
          ...state,
          orderReducerStatus: SUCCESS
        }
      }
    default:
      return state;
  }
}
