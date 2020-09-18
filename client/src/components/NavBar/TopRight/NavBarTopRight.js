import React, {Fragment} from "react";

import { Link } from "react-router-dom";

import Login from "./Login/Login";
import Register from "../TopRight/Register/Register";
import cartIcon from "../../../Images/cart.png";

import "./NavBarTopRight.css";
import { connect } from "react-redux";

const NavBarTopRight = (props) => {
  const {
    user: {
      authenticated,
      credentials: { name },
    },
  } = props;
  let topRightMarkUp = authenticated ? (
    <span>{name}</span>
  ) : (
    <Fragment>
      <Register />
      <Login />
    </Fragment>
  );

  return (
    <div className="topRightContainer">
      {topRightMarkUp}
      <img src={cartIcon}></img>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(NavBarTopRight);
