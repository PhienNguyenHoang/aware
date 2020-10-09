import React, { useState } from "react";
import { connect } from "react-redux";
import logo from "../../../Images/logo.png";
import AdminDashboardMenu from "../../../components/AdminDashboardMenu/AdminDashboardMenu";
import AdminNavBar from "../../../components/AdminNavBar/AdminNavBar";

import "./AdminDashboard.css";
const AdminDashboard = () => {
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
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AdminDashboard);
