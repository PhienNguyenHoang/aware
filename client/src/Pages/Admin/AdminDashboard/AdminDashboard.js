import React from "react";
import { connect } from "react-redux";
import logo from "../../../Images/logo.png";
import mail from "../../../Images/mail.png";
import noti from "../../../Images/notification.png";
import dropdown from "../../../Images/dropdown.png";
import "./AdminDashboard.css";
import AdminDashboardMenu from "../../../components/AdminDashboardMenu/AdminDashboardMenu";
const AdminDashboard = ({ user: { credentials, authenticated } }) => {
 

  return (
    
    <div className="dashboard-container">
      <div className="dashboard-menu">
        <div className="admin-logo-container">
          <img alt="" src={logo} />
        </div>
        <AdminDashboardMenu />
      </div>
      <div className="dashboard-content">
        <div className="content-first-bar">
          <div className="admin-box">
            <div className="admin-username">
              {credentials.name} <img alt="" src={dropdown} />
            </div>
            <img alt="" src={mail} />
            <img alt="" src={noti} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AdminDashboard);
