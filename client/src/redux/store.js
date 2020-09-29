import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from './reducers/userReducer';
import categoryReducer from './reducers/categoryReducer'
import productReducer from "./reducers/productReducer";
import adminReducer from './reducers/adminReducer'
import cartReducer from "./reducers/cartReducer";
const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  admin: adminReducer,
  cart: cartReducer
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
  )
);
 export default store;