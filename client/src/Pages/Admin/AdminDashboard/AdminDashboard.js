import React, { useState } from "react";
import { connect } from "react-redux";
import logo from "../../../Images/logo.png";
import AdminDashboardMenu from "../../../components/AdminDashboardMenu/AdminDashboardMenu";
import ProductTab from "../../../components/AdminDashboardMenu/ProductTab/ProductTab";
import AdminNavBar from "../../../components/AdminNavBar/AdminNavBar";
import AddProduct from "../../../components/AddProduct/AddProduct";
import OrderTab from "../../../components/OrderTab/OrderTab";
import "./AdminDashboard.css";
const renderTab = (tab, handleClick) => {
  switch(tab) {
    case 'product':
      return <div className="content-box"><ProductTab handleClick={handleClick} /></div>
    
    case 'Add product': 
      return <AddProduct />
    case 'orders':
      return <div className="content-box"><OrderTab /></div>
  }
}
const AdminDashboard = () => {
  const [tab, setTab] = useState('');
  const handleClick = (tabChosen) => {
    setTab(tabChosen)
  }
  let contentMarkUp = renderTab(tab, handleClick);
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-menu">
        <div className="admin-logo-container">
          <img alt="" src={logo} />
        </div>
        <AdminDashboardMenu handleClick={handleClick}/>
      </div>
      <div className="dashboard-content">
        <AdminNavBar />
          {contentMarkUp}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AdminDashboard);
