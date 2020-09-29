import React, { useEffect, useState } from "react";
import { getOneProduct } from "../../firebase/firebase";
import minus from "../../Images/minus.png";
import plus from "../../Images/plus.png";
import "./ProductDetails.css";
import NavBar from "../../components/NavBar/NavBar";
import { useParams } from "react-router-dom";
import SizeBox from "../../components/SizeBox/SizeBox";
import { sortSize } from "../../util/sortSize";
const ProductDetails = ({ history }) => {
  let productDetails, productPath, sizeBoxMarkUp;
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState({});
  const [activeItem, setActiveItem] = useState("");
  const productURL = history.location.pathname.split("/product/");
  const productName = productURL[1].split("-").join(" ");
  const handleIncrement = () => {
    setQuantity((quantity) => quantity + 1);
  };
  const handleDecrement = () => {
    setQuantity((quantity) => quantity - 1);
  };
  useEffect(() => {
    const fetchData = async () => {
      productDetails = await getOneProduct(productName);
      setProduct(productDetails);
    };
    fetchData();
  }, []);
  const toggleCss = (size) => {
    console.log(size);
    setActiveItem(size);
  };
  console.log(product);
  productPath = `${product.customerType}/ ${product.type}/ ${product.name}`;
  let sizeArray = product.sizes;

  if (sizeArray) {
    sizeArray = sortSize(sizeArray);
    sizeBoxMarkUp = sizeArray.map((item, index) => (
      <SizeBox
        size={item}
        key={index}
        toggleCss={toggleCss}
        isActive={activeItem === item}
      />
    ));
  }

  return (
    <div className="product-details-outer-container">
      <NavBar />
      <div className="product-details-container">
        <p className="product-details-path">{productPath}</p>
        <div class="grid grid-cols-4 gap-4 customize-container">
          <div className="col-span-1 customize "></div>
          <div className="col-span-1 customize-product-image">
            <img src={product.imageUrl} alt="" />
          </div>
          <div className="col-span-1 customize-product-info">
            <p>{product.name}</p>
            <p>{product.price}$</p>
            <p>Size</p>
            <div className="product-details-size-box">{sizeBoxMarkUp}</div>
            <div className="quantity-box">
              <img
                src={minus}
                alt=""
                className="quantity-icon"
                onClick={handleDecrement}
              />
              <span>{quantity}</span>
              <img
                src={plus}
                alt=""
                className="quantity-icon"
                onClick={handleIncrement}
              />
            </div>
            <div className="add-to-cart-button">
              <button>Add to cart</button>
            </div>
          </div>
          <div className="col-span-1 customize-additional-image"></div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
