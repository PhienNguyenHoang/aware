import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryByCustomerTypeAndType,
  getAllProductsByCustomerTypeAndType,
} from "../../firebase/firebase";
import ProductList from "../../components/ProductList/ProductList";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import ProductCategory from "../../components/ProductCategory/ProductCategory";
import {
  getCategory,
  chooseCategory,
  clearChosenCategory,
} from "../../redux/actions/categoryActions";
import { getProduct } from "../../redux/actions/productActions";
import "./ProductPage.css";
import NavBar from "../../components/NavBar/NavBar";
import { useState } from "react";
const ProductPage = ({ location }) => {
  const [filterConditions, setFilterConditions] = useState({});
  let params = new URLSearchParams(location.search);
  const customerType = params.get("ct");
  const type = params.get("t");
  const dispatch = useDispatch();
  const onClickCategory = (chosenCategory) => {
    dispatch(chooseCategory(chosenCategory));
  };
  const { products } = useSelector((state) => state.product);
  const category = useSelector((state) => state.category);
  const { categories, categoryChosen } = category;
  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategoryByCustomerTypeAndType(
        customerType,
        type
      );
      dispatch(getCategory(categories));
      const products = await getAllProductsByCustomerTypeAndType(
        customerType,
        type,
        categoryChosen,
        filterConditions
      );
      console.log(products);
      dispatch(getProduct(products));
    };
    fetchData();
  }, [categoryChosen, filterConditions]);
  let categoriesMarkUp = categories.map((item) => (
    <ProductCategory
      name={item}
      key={item}
      onClickCategory={onClickCategory}
      type={type}
    />
  ));
  let productListMarkUp = products.map((item) => (
    <ProductList name={item.name} price={item.price} imageUrl={item.imageUrl} />
  ));
  console.log(filterConditions);
  const colorList = [];
  products.forEach((item) => {
    colorList.push(...item.color);
  });
  const uniqueColorList = [...new Set(colorList)];
  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-3 gap-4 paddingLeftRight">
        <div className="col-span-1 left-column">
          <div className="category">Category</div>
          <div
            className="all-product"
            onClick={() => {
              dispatch(clearChosenCategory());
            }}
          >
            All {type}
          </div>
          <div className="category-markup">{categoriesMarkUp}</div>
          <ProductFilter
            className="product-filter-box"
            colorList={uniqueColorList}
            filterConditions={filterConditions}
            setFilterConditions={setFilterConditions}
            customerType={customerType}
            type={type}
          />
        </div>
        <div className="col-span-2 right-column" id="margin-left">
          <div className="product-list-path">
            <div className="span">
              <span>{customerType}</span> / <span>{type}</span>
            </div>
          </div>
          <div className="product-panel-flex">{productListMarkUp}</div>
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
