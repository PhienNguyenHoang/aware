import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import categoryReducer from "./reducers/categoryReducer";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import loginReducer from "./reducers/loginReducer";
const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
  login: loginReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware))
);
export default store;
