import React from "react";
import "./ProductCategory.css";
import { CATEGORY } from "../../constants/firebaseContant";

const ProductCategory = (props) => {
  const { name, onClickCategory } = props;
  const setQueryParams = () => {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set(CATEGORY, name);
    window.location.search = searchParams;
  };
  return (
    <div
      className="category-list"
      onClick={() => {
        setQueryParams();
      }}
    >
      {name}
    </div>
  );
};
export default ProductCategory;
