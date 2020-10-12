import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getOneProduct, addProductToCart } from "../../firebase/firebase";
import {
  addItemToCart,
  unAuthAddItemToCart,
} from "../../redux/actions/cartActions";
import minus from "../../Images/minus.png";
import plus from "../../Images/plus.png";
import NavBar from "../../components/NavBar/NavBar";
import SizeBox from "../../components/SizeBox/SizeBox";
import { sortSize } from "../../util/sortSize";
import ColorBox from "../../components/ColorBox/ColorBox";
import "./ProductDetails.css";
import { getSpecificProduct } from "../../redux/actions/productActions";
import  AdditionalImages  from "../../components/AdditionalImages/AdditionalImages";
const ProductDetails = ({
  history,
  user: { authenticated, credentials },
  addItemToCart,
  unAuthAddItemToCart,
  getSpecificProduct,
  productReducer: { product },
}) => {
  let productDetails, productPath, sizeBoxMarkUp, colorBoxMarkUp;
  const [quantity, setQuantity] = useState(1);
  const [activeSize, setActiveSize] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const [imageClicked, setClicked] = useState(false)
  const productURL = history.location.pathname.split("/product/");
  const productName = productURL[1].split("-").join(" ");
  const handleIncrement = () => {
    setQuantity((quantity) => quantity + 1);
  };
  const handleDecrement = () => {
    setQuantity((quantity) => quantity - 1);
  };
  const handleClickImage = (url) => {
    setActiveImage(url);
    setClicked(true)
  }
  useEffect(() => {
    getSpecificProduct(productName);
  }, []);
  const toggleCssSize = (clickedItem) => {
    setActiveSize(clickedItem);
  };
  const toggleCssColor = (clickedItem) => {
    setActiveColor(clickedItem);
  };
  productPath = `${product.customerType}/ ${product.type}/ ${product.name}`;
  let sizeArray = product.sizes;
  let colorArray = product.colors;
  if (sizeArray && colorArray) {
    sizeArray = sortSize(sizeArray);
    sizeBoxMarkUp = sizeArray.map((item, index) => (
      <SizeBox
        size={item}
        key={index}
        toggleCss={toggleCssSize}
        isActive={activeSize === item}
      />
    ));
    colorBoxMarkUp = colorArray.map((item, index) => (
      <ColorBox
        color={item}
        key={index}
        toggleCss={toggleCssColor}
        isActive={activeColor === item}
      />
    ));
  }
  const handleAddToCart = async () => {
    let productObj = {
      name: product.name,
      color: activeColor,
      size: activeSize,
      quantity: quantity,
      amount: product.price * quantity,
      imageUrl: product.imageUrl,
    };
    if (authenticated) {
      let cartObj = {
        userId: credentials.userId,
        username: credentials.name,
        product: productObj,
      };
      if (activeColor && activeSize) {
        await addProductToCart(cartObj);
        addItemToCart(cartObj.product);
      } else {
        alert("Please select the size and color you want!");
      }
    } else {
      // addItemToCart(productObj);
      unAuthAddItemToCart(productObj);
    }
  };
  let imageMarkUp =
    Object.keys(product).length > 0 && !imageClicked ? (
      <img src={product.imageUrl[0]} alt="" />
    ) : <img src={activeImage} alt="" />;
  let additionalImageMarkUp =
    Object.keys(product).length > 0
      ? product.imageUrl.map((item, index) => <AdditionalImages url={item} key={index} handleClickImage={handleClickImage}/>)
      : null;
  return (
    <div className="product-details-outer-container">
      <NavBar />
      <div className="product-details-container">
        <p className="product-details-path">{productPath}</p>
        <div className="grid grid-cols-3 gap-4 customize-container">
          <div className="col-span-1 customize-additional-image">
            {additionalImageMarkUp}
          </div>
          <div className="col-span-1 customize-product-image">
            {/* <img src={product.imageUrl} alt="" /> */}
            {imageMarkUp}
          </div>
          <div className="col-span-1 customize-product-info">
            <div className="product-details-name">{product.name}</div>
            <div className="product-details-price">{product.price}$</div>
            <div className="product-details-title">Size</div>
            <div className="product-details-size-box">{sizeBoxMarkUp}</div>
            <div className="product-details-title">Color</div>
            <div className="product-details-color-box">{colorBoxMarkUp}</div>
            <div className="product-details-title">
              Quantity
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
            </div>
            <div className="add-to-cart-button">
              <button onClick={handleAddToCart}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  productReducer: state.product,
});

const mapActionsToProps = {
  addItemToCart,
  unAuthAddItemToCart,
  getSpecificProduct,
};

export default connect(mapStateToProps, mapActionsToProps)(ProductDetails);
