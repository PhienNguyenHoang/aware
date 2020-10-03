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
import {
  getProduct,
  getChosenCategory,
} from "../../redux/actions/productActions";
import { CLEAR_FILTER_CATEGORY } from "../../redux/types";
import "./ProductPage.css";
import NavBar from "../../components/NavBar/NavBar";
import { useState } from "react";
const ProductPage = ({location}) => {
  const [filterConditions, setFilterConditions] = useState([]);
  let filteredProductByCategory = [];
  let params = new URLSearchParams(location.search);
  const customerType = params.get("ct");
  const type = params.get("t");
  const dispatch = useDispatch();
  const onClickCategory = (chosenCategory) => {
    console.log("dispatching");
    dispatch(getChosenCategory(chosenCategory));
  };
  console.log(type);
  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategoryByCustomerTypeAndType(
        customerType,
        type,
        );
        dispatch(getCategory(categories));
        const products = await getAllProductsByCustomerTypeAndType(
          customerType,
          type
          //filterConditions,
      );
      dispatch(getProduct(products));
    };
    fetchData();
  }, []);
  const category = useSelector((state) => state.category);
  const { categories } = category;
  let categoriesMarkUp = categories.map((item) => (
    <ProductCategory
      name={item}
      key={item}
      onClickCategory={onClickCategory}
      type={type}
    />
  ));
  const {products, category: categoryChosen} = useSelector((state) => state.product);
  if (!categoryChosen) {
    filteredProductByCategory = products;
  } else {
    filteredProductByCategory = products.filter((item) => {
      return item.category === categoryChosen;
    });
  }
  // console.log("redux products", products);
  // console.log("category chosen", categoryChosen);
  // console.log("filtered product", filteredProductByCategory);
  let productListMarkUp = filteredProductByCategory.map((item) => (
    <ProductList name={item.name} price={item.price} imageUrl={item.imageUrl} />
  ));
  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-3 gap-4 paddingLeftRight">
        <div className="col-span-1 left-column">
          <div className="category">Category</div>
          <div
            className="all-product"
            onClick={() => {
              dispatch({ type: CLEAR_FILTER_CATEGORY });
            }}
          >
            All {type}
          </div>
          <div className="category-markup">{categoriesMarkUp}</div>
          <ProductFilter className="product-filter-box" setFilterConditions={setFilterConditions}/>
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
