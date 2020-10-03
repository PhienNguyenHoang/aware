import React, { Fragment } from "react";
import "./ProductFilter.css";
const ProductFilter = ({ setFilterConditions }) => {
  return (
    <Fragment>
      <div className="filter">Filter</div>
      <div className="filter-list">Size</div>
      <div className="filter-list">Color</div>
      <div className="filter-list">Brand</div>
      <div className="filter-list">Price</div>
      <div className="filter-list">Available</div>
    </Fragment>
  );
};

export default ProductFilter;


