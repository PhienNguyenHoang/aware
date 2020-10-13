import React, { Fragment, useEffect } from "react";
import { sizeArray } from "../../constants/general";
import dropdown from "../../Images/dropdown.png";
import "./ProductFilter.css";
import { useState } from "react";
import SizeBox from "../SizeBox/SizeBox";
import ColorBox from "../ColorBox/ColorBox";
const ProductFilter = ({
  setFilterConditions,
  colorList,
  filterConditions,
  sizeQueryParam,
  colorQueryParam
}) => {
  const [openSize, setOpenSize] = useState(!!sizeQueryParam);
  const [openColor, setOpenColor] = useState(!!colorQueryParam);
  const [openBrand, setOpenBrand] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [openAvailable, setOpenAvailable] = useState(false);
  const [activeSize, setActiveSize] = useState("");
  const [activeColor, setActiveColor] = useState("");

  const toggleSize = () => {
    if (openSize) {
      setOpenSize(false);
      setActiveSize("");
    } else {
      setOpenSize(true);
    }
  };
  const toggleColor = () => {
    if (openColor) {
      setOpenColor(false);
      setActiveColor("");
    } else {
      setOpenColor(true);
    }
  };
  const toggleBrand = () => {
    if (openBrand) {
      setOpenBrand(false);
    } else {
      setOpenBrand(true);
    }
  };
  const togglePrice = () => {
    if (openPrice) {
      setOpenPrice(false);
    } else {
      setOpenPrice(true);
    }
  };
  const toggleAvailable = () => {
    if (openAvailable) {
      setOpenAvailable(false);
    } else {
      setOpenAvailable(true);
    }
  };
  const toggleCssSize = (clickedItem) => {
    setActiveSize(clickedItem);
    setFilterConditions({ ...filterConditions, size: clickedItem });
  };
  const toggleCssColor = (clickedItem) => {
    setActiveColor(clickedItem);
    setFilterConditions({ ...filterConditions, color: clickedItem });
  };
  const sizeBoxMarkup = sizeArray.map((item, index) => (
    <SizeBox
      key={index}
      size={item}
      isActive={activeSize === item}
      toggleCss={toggleCssSize}
    />
  ));
  const colorBoxMarkup = colorList.map((item, index) => (
    <ColorBox
      key={index}
      color={item}
      isActive={activeColor === item}
      toggleCss={toggleCssColor}
    />
  ));
  console.log(filterConditions)
  return (
    <Fragment>
      <div className="filter">Filter</div>
      <div
        className={openSize ? "filter-list-open" : "filter-list"}
        onClick={toggleSize}
      >
        <span>Size</span>
        <img src={dropdown} alt="" />
      </div>
      <div
        className={
          openSize ? "size-dropdown-content-open" : "size-dropdown-content"
        }
      >
        {sizeBoxMarkup}
      </div>
      <div
        className={openColor ? "filter-list-open" : "filter-list"}
        onClick={toggleColor}
      >
        <span>Color</span>
        <img src={dropdown} alt="" />
      </div>
      <div
        className={
          openColor  ? "color-dropdown-content-open" : "color-dropdown-content"
        }
      >
        {colorBoxMarkup}
      </div>
      <div
        className={openBrand ? "filter-list-open" : "filter-list"}
        onClick={toggleBrand}
      >
        <span>Brand</span>
        <img src={dropdown} alt="" />
      </div>
      <div
        className={
          openBrand ? "brand-dropdown-content-open" : "brand-dropdown-content"
        }
      >
        Brand
      </div>
      <div
        className={openPrice ? "filter-list-open" : "filter-list"}
        onClick={togglePrice}
      >
        <span>Price</span>
        <img src={dropdown} alt="" />
      </div>
      <div
        className={
          openPrice ? "price-dropdown-content-open" : "price-dropdown-content"
        }
      >
        Price
      </div>
      <div
        className={openAvailable ? "filter-list-open" : "filter-list"}
        onClick={toggleAvailable}
      >
        <span>Available</span>
        <img src={dropdown} alt="" />
      </div>
      <div
        className={
          openAvailable
            ? "available-dropdown-content-open"
            : "available-dropdown-content"
        }
      >
        Available
      </div>
    </Fragment>
  );
};

export default ProductFilter;
