import React from "react";
import {connect} from 'react-redux';

import noti from "../../Images/notification.png";
import dropdown from "../../Images/dropdown.png";
import mail from "../../Images/mail.png";


const AdminNavBar = ({user: {credentials}}) => {
  return (
    <div className="content-first-bar">
      <div className="admin-box">
        <div className="admin-username">
          {credentials.name} <img alt="" src={dropdown} />
        </div>
        <img alt="" src={mail} />
        <img alt="" src={noti} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(AdminNavBar);
