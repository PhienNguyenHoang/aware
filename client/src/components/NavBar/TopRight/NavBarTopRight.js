import React, { useEffect, Fragment } from "react";

import Login from "./Login/Login";
import UserBox from "./UserBox/UserBox";
import Register from "../TopRight/Register/Register";
//icon
import cartIcon from "../../../Images/cart.png";
//badge
//CSS
import "./NavBarTopRight.css";
//redux
import { connect } from "react-redux";
import { getCart } from "../../../firebase/firebase";
import { setCartAtLogin } from "../../../redux/actions/cartActions";

const NavBarTopRight = (props) => {
  const {
    user: {
      authenticated,
      credentials: { name },
    },
    cart: { count },
    setCartAtLogin,
  } = props;
  let topRightMarkUp = authenticated ? (
    <UserBox name={name} />
  ) : (
    <Fragment>
      <Register />
      <Login />
    </Fragment>
  );
  useEffect(() => {
    const fetchData = async () => {
      if (authenticated && name) {
        const fetchData = await getCart(name);
        if(!Object.keys(fetchData).length == 0){
          setCartAtLogin(fetchData);
        }
      }
    };
    fetchData();
  }, [name]);
  return (
    <div className="topRightContainer">
      {topRightMarkUp}
      <a href="/cart">
        <div className="top-right-flex">
          <img src={cartIcon} alt=""></img>
          <span className="cart-badge">{count}</span>
        </div>
      </a>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart,
});

export default connect(mapStateToProps, { setCartAtLogin })(NavBarTopRight);
