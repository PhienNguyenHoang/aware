import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryByCustomerTypeAndType,
  getAllProductsByCustomerTypeAndType,
  getProductNextPage,
  getPreviousPage,
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
import { filter } from "p-iteration";
const ProductPage = ({ location, history }) => {
  const [filterConditions, setFilterConditions] = useState({});
  let params = new URLSearchParams(location.search);
  const page = params.get("page");
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
        filterConditions,
        page
      );
      dispatch(getProduct(products));
    };
    fetchData();
  }, [categoryChosen, customerType, dispatch, filterConditions, page, type]);
  let categoriesMarkUp = categories.map((item) => (
    <ProductCategory
      name={item}
      key={item}
      onClickCategory={onClickCategory}
      type={type}
    />
  ));
  let productListMarkUp = products.map((item, index) => (
    <ProductList
      key={index}
      name={item.name}
      price={item.price}
      imageUrl={item.imageUrl}
    />
  ));
  const colorList = [];
  if (products.length > 0) {
    products.forEach((item) => {
      if (item) {
        colorList.push(...item.color);
      }
    });
  }
  const uniqueColorList = [...new Set(colorList)];
  // console.log(products[products.length - 1])

  const handleNextPage = async () => {
    //  console.log(params.set('page', Number(page)+1));
    const string = location.search;
    const string2 = string.split("=");
    string2[string2.length - 1] = String(
      Number(string2[string2.length - 1]) + 1
    );
    const string3 = string2.join("=");
    console.log(string3);
    console.log(location.search);

    // window.location.search = params
    console.log(params);
    // if (history.pushState) {
    let newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      string3;
    window.history.pushState({ path: newurl }, "", newurl);
    // }
    if (products.length > 0) {
      const lastCreatedAt = products[products.length - 1].createdAt;
      const productsNextPage = await getProductNextPage(
        customerType,
        type,
        categoryChosen,
        filterConditions,
        lastCreatedAt
      );
      dispatch(getProduct(productsNextPage));
    }
  };
  const handlePreviousPage = async () => {
    if (products.length) {
      const firstCreatedAt = products[0].createdAt;
      const productsPreviousPage = await getPreviousPage(
        customerType,
        type,
        categoryChosen,
        filterConditions,
        firstCreatedAt
      );
      dispatch(getProduct(productsPreviousPage));
    }
  };
  return (
    <div>
      <NavBar />
      <button onClick={handlePreviousPage}>previous page</button>/
      <button onClick={handleNextPage}>next page</button>
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
