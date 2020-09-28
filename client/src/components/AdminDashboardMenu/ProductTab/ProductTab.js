import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProduct } from "../../../redux/actions/productActions";
import { getAllProduct } from "../../../firebase/firebase";
import "./ProductTab.css";
import DashboardProductCard from "./DashboardProductCard/DashboardProductCard";
const ProductTab = ({ getProduct, product, handleClick }) => {
  useEffect(() => {
    const fetchData = async () => {
      const fetchProduct = await getAllProduct();
      getProduct(fetchProduct);
    };
    fetchData();
  }, []);
  const { products } = product;
  console.log(products);
  let productMarkUp = products.map((item) => (
    <DashboardProductCard
      name={item.name}
      customerType={item.customerType}
      category={item.category}
      createdAt={item.createdAt}
    />
  ));

  return (
    <div className="product-tab-container">
      <div className="second-bar">
          <button onClick={() => {handleClick('Add product')}}>add product</button>
        </div>
      <div className="row">
        <span className="row-product">PRODUCT</span>
        <span className="row-sold">SOLD</span>
        <span className="row-date">DATE ADDED</span>
        <span className="row-profit">PROFIT($)</span>
      </div>
      {productMarkUp}
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getProduct })(ProductTab);
