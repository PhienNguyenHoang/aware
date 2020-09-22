import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from './reducers/userReducer';
import categoryReducer from './reducers/categoryReducer'
import productReducer from "./reducers/productReducer";
const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  category: categoryReducer,
  product: productReducer
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
  )
);
 export default store;