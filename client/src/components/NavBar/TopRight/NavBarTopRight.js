import React, {Fragment} from "react";

import Login from "./Login/Login";
import UserBox from "./UserBox/UserBox";
import Register from "../TopRight/Register/Register";
//icon
import cartIcon from "../../../Images/cart.png";
//CSS
import "./NavBarTopRight.css";
//redux
import { connect } from "react-redux";

const NavBarTopRight = (props) => {
  const {
    user: {
      authenticated,
      credentials: { name },
    },
  } = props;
  let topRightMarkUp = authenticated ? (
    <UserBox name={name} />
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
