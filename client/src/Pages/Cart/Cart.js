import React from "react";
import { connect } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import "./Cart.css";
import ProductInCart from "../../components/ProductInCart/ProductInCart";
const Cart = ({ cart: { products } }) => {
  console.log(products);
  let productInCartMarkUp = products.map((product, index) => (
    <ProductInCart
      key={index}
      imageUrl={product.imageUrl}
      name={product.name}
      color={product.color}
      size={product.size}
      quantity={product.quantity}
      amount={product.amount}
    />
  ));
  return (
    <div>
      <NavBar />
      <div className="cart-content">
        <div>My Bag</div>
        {productInCartMarkUp}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Cart);
