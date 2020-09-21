import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./redux/types";
import { getUserData } from "./redux/actions/userActions";
//axios
import axios from "axios";
import { FBIdToken } from "./constants/localStorage";
//
import Home from "./Pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import ProductPage from "./Pages/ProductPage/ProductPage";
axios.defaults.baseURL =
  "https://asia-east2-aware-ecommerce-87f05.cloudfunctions.net/api";

const App = () => {
  useEffect(() => {
    let token = localStorage.getItem(FBIdToken);
    if (token) {
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common["Authorization"] = token;
      store.dispatch(getUserData());
    } else {
      store.dispatch({ type: SET_UNAUTHENTICATED });
    }
    return () => {};
  });
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exac path="/product" component={ProductPage} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
