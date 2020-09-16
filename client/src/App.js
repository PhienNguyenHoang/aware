import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
//redux
import { Provider } from "react-redux";
import store from "./redux/store";
//axios
import axios from 'axios';


axios.defaults.baseURL = "https://asia-east2-aware-ecommerce-87f05.cloudfunctions.net/api";

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
