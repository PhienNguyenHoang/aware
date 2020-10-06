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
import { setCartAtLogin, setUnauthenticatedCart } from "../../../redux/actions/cartActions";

const NavBarTopRight = (props) => {
  const {
    user: {
      authenticated,
      credentials: { name },
    },
    cart: { count },
    setCartAtLogin,
    setUnauthenticatedCart
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
      else {
        const localStorageData = localStorage.getItem("productsInCart")
        if(localStorageData && localStorageData.length > 0){
          const localStorageProducts = JSON.parse(localStorageData);
          console.log(localStorageProducts)
          setUnauthenticatedCart(localStorageProducts);
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

export default connect(mapStateToProps, { setCartAtLogin, setUnauthenticatedCart })(NavBarTopRight);
