import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProduct } from "../../../redux/actions/productActions";
import { getAllProduct } from "../../../firebase/firebase";
import logo from "../../../Images/logo.png";
import AdminDashboardMenu from "../../../components/AdminDashboardMenu/AdminDashboardMenu";
import AdminNavBar from "../../../components/AdminNavBar/AdminNavBar";
import DashboardProductCard from "./DashboardProductCard/DashboardProductCard";
import plus from "../../../Images/plus-white.png";
import "./ProductTab.css";
const ProductTab = ({ getProduct, product: {products}, location }) => {
  let params = new URLSearchParams(location.search);
  const page = params.get("page");
  useEffect(() => {
    const fetchData = async () => {
      const fetchProduct = await getAllProduct(page);
      getProduct(fetchProduct);
    };
    fetchData();
  }, []);
  let productMarkUp = products.map((item, index) => (
    <DashboardProductCard
      key={index}
      index={index}
      name={item.name}
      customerType={item.customerType}
      category={item.category}
      createdAt={item.createdAt}
      imageUrl={item.imageUrl}
    />
  ));

  return (
    <div className="dashboard-container">
      <div className="dashboard-menu">
        <div className="admin-logo-container">
          <img alt="" src={logo} />
        </div>
        <AdminDashboardMenu />
      </div>
      <div className="dashboard-content">
        <AdminNavBar />
        <div className="content-box">
          <div className="product-tab-container">
            <div className="second-bar">
              <img src={plus} alt="" />
              <a href="/admin/dashboard/add-product">
                <button>Add product</button>
              </a>
            </div>
            <div className="row">
              <span className="row-product">PRODUCT</span>
              <span className="row-sold">SOLD</span>
              <span className="row-date">DATE ADDED</span>
              <span className="row-profit">PROFIT($)</span>
            </div>
            {productMarkUp}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getProduct })(ProductTab);
