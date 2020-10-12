import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryByCustomerTypeAndType,
  getAllProductsByCustomerTypeAndType,
} from "../../firebase/firebase";
import ProductList from "../../components/ProductList/ProductList";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import ProductCategory from "../../components/ProductCategory/ProductCategory";
import { getCategory } from "../../redux/actions/categoryActions";
import { getProduct } from "../../redux/actions/productActions";
import "./ProductPage.css";
import NavBar from "../../components/NavBar/NavBar";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";
const ProductPage = ({ location, history }) => {
  let params = new URLSearchParams(location.search);
  const page = params.get("page") || 1;
  const customerType = params.get("ct");
  const type = params.get("t");
  const size = params.get("size");
  const color = params.get("color");
  const categoryQuery = params.get("category");
  const [filterConditions, setFilterConditions] = useState({
    size: size,
    color: color,
    category: categoryQuery,
  });
  const dispatch = useDispatch();
  // const onClickCategory = (chosenCategory) => {
  //   dispatch(chooseCategory(chosenCategory));
  // };
  const { products } = useSelector((state) => state.product);
  const category = useSelector((state) => state.category);
  const { categories } = category;
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
        filterConditions,
        page
      );
      dispatch(getProduct(products));
    };
    fetchData();
  }, [customerType, dispatch, filterConditions, page, type]);
  let categoriesMarkUp = categories.map((item) => (
    <ProductCategory
      name={item}
      key={item}
      // onClickCategory={onClickCategory}
      type={type}
    />
  ));
  // let productListMarkUp = products.map((item, index) => (
  //   <ProductList
  //     key={index}
  //     name={item.name}
  //     price={item.price}
  //     imageUrl={item.imageUrl}
  //   />
  // ));
  let productListMarkUp = products.length > 0 ? (products.map((item, index) => (
    <ProductList
      key={index}
      name={item.name}
      price={item.price}
      imageUrl={item.imageUrl}
    />
  ))) : (<Loader />)
  const colorList = [];
  if (products.length > 0) {
    products.forEach((item) => {
      if (item) {
        colorList.push(...item.color);
      }
    });
  }
  const uniqueColorList = [...new Set(colorList)];
  console.log(products);
  const handleNextPage = async () => {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", Number(page) + 1);
    window.location.search = searchParams;
  };
  const handlePreviousPage = async () => {
    if (page > 1) {
      let searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", Number(page) - 1);
      window.location.search = searchParams;
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
              setFilterConditions({ ...filterConditions, category: null });
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
            sizeQueryParam={size}
            colorQueryParam={color}
          />
        </div>
        <div className="col-span-2 right-column" id="margin-left">
          <div className="product-list-path">
            <div className="span">
              <span>{customerType}</span> / <span>{type}</span>
            </div>
          </div>
          <div className={products.length > 0 ? "product-panel-flex" : "product-panel-flex-loading"}>{productListMarkUp}</div>
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
