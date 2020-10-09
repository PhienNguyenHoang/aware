import React from "react";
import overview from "../../Images/overview-dark.png";
import orders from "../../Images/orders-dark.png";
import products from "../../Images/products-dark.png";
import payments from "../../Images/payment-dark.png";
import setting from "../../Images/setting-dark.png";
import "./AdminDashboardMenu.css";
const AdminDashboardMenu = () => {
  return (
    <div className="">
      <div className="menu-item">
        <img alt="" src={overview} className="menu-icon" />
        Overview
      </div>
      <a href="/admin/dashboard/orders">
        <div
          className="menu-item"
        >
          <img alt="" src={orders} className="menu-icon" />
          Orders
        </div>
      </a>
      <a href="/admin/dashboard/products?page=1">
        <div
          className="menu-item menu-item-product"
        >
          <img alt="" src={products} className="menu-icon" />
          Products
        </div>
      </a>
      <div className="menu-item">
        <img alt="" src={payments} className="menu-icon" />
        Payments
      </div>
      <div className="menu-item">
        <img alt="" src={setting} className="menu-icon" />
        Setting
      </div>
      <div className="menu-item"></div>
    </div>
  );
};
export default AdminDashboardMenu;
