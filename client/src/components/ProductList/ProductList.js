import React from 'react'
import './ProductList.css'
const ProductList = (props) => {
    const {name, price, imageUrl} = props;
    return (
        <div className="product-box">
            <img src={imageUrl} alt=""/>
            <div className="product-box-text-name">{name}</div>
            <div className="product-box-text-price">{price}$</div>
        </div>
    )
}

export default ProductList;
