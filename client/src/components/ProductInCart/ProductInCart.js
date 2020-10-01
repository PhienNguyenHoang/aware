import React from "react";
import "./ProductInCart.css";
const ProductInCart = ({ imageUrl, name, color, size, quantity, amount }) => {
  return (
    <div className="product-in-cart-container">
      <div className="product-image-and-name">
        <div className="in-cart-image">
          <img src={imageUrl} alt="" />
        </div>
        <div className="in-cart-name">
          <span>{name}</span>
          <div>
            <span>change</span>
          </div>
        </div>
      </div>
        <div className="in-cart-product-flex-container">
          <div
            className="in-cart-color"
            style={{ backgroundColor: color }}
          ></div>
        </div>
        <div className="in-cart-product-flex-container">
            <span>{size}</span>
        </div>
        <div className="in-cart-product-flex-container">
            <span>{quantity}</span>
        </div>
        <div className="in-cart-product-flex-container">
            <span>${amount}.00</span>
        </div>
    </div>
  );
};
export default ProductInCart;
