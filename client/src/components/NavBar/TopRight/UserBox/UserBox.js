import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
//routes
import { HOME } from "../../../../constants/routes";
import { logoutUser } from "../../../../redux/actions/userActions";

//CSS
import "./UserBox.css";
import Loader from "../../../Loader/Loader";

const UserBox = (props) => {
  const { name } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Fragment>
      <div className="user-box-dropdown">
        {name ? <div className="user-box">{name}</div> : <Loader />}
        <div className="user-dropdown-content">
          <button
            className="user-dropdown-button"
            onClick={() => {
              dispatch(logoutUser());
              history.push(HOME);
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default UserBox;
