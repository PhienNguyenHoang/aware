import React, { Fragment } from "react";

//CSS
import "./UserBox.css";

const UserBox = (props) => {
  const { name } = props;
  let userName = String(name).toUpperCase();

  return (
    <Fragment>
      <div className="user-box-dropdown">
        <div className="user-box">
          {userName}
        </div>
        <div className="user-dropdown-content">
            <button className="user-dropdown-button">Logout</button>
        </div>  
      </div>
    </Fragment>
  );
};

export default UserBox;
