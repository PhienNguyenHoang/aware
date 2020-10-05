import React from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";
const ProductList = (props) => {
  const { name, price, imageUrl } = props;
  const productURL = name.split(" ").join('-');
//   productURL.forEach(item => {
//       item.toLowerCase()
//   });
//   productURL.join('-');
  return (
    <Link to={`/product/${productURL}`}>
      <div className="product-box">
        <img src={imageUrl} alt="" />
        <div className="product-box-text-name">{name}</div>
        <div className="product-box-text-price">{price}$</div>
      </div>
    </Link>
  );
};

export default ProductList;
