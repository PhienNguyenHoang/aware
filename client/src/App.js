import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./redux/types";
import { getUserData } from "./redux/actions/userActions";
//axios
import axios from "axios";

axios.defaults.baseURL =
  "https://asia-east2-aware-ecommerce-87f05.cloudfunctions.net/api";

let token = localStorage.FBIdtoken;
if (token) {
  store.dispatch({ type: SET_AUTHENTICATED });
  axios.defaults.headers.common['Authorization'] = token;
  store.dispatch(getUserData());
}
else {
  store.dispatch({ type: SET_UNAUTHENTICATED });
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
