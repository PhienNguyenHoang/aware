import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryByCustomerTypeAndType,
} from "../../firebase/firebase";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import ProductCategory from "../../components/ProductCategory/ProductCategory";
import { getCategory } from "../../redux/actions/productActions";
import "./ProductPage.css";
const ProductPage = (props) => {
  const { location } = props;
  let params = new URLSearchParams(location.search);
  const customerType = params.get("ct");
  const type = params.get("t");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategoryByCustomerTypeAndType(customerType, type);
      dispatch(getCategory(categories))
    }
    fetchData();
  },[])
  const category = useSelector(state => state.category);
  const {categories} = category;
  let categoriesMarkUp = categories.map(item => <ProductCategory name={item.name} key={item.id}/>)

  return (
    <div className="grid grid-cols-3 gap-4 paddingLeftRight">
      <div className="col-span-1 left-column">
        <div className="category">Category</div>
        {categoriesMarkUp}
        <ProductFilter />
      </div>
      <div className="col-span-2 ...">hello</div>
    </div>
  );
};
export default ProductPage;
