import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
//routes
import { HOME } from "../../../../constants/routes";
import { logoutUser } from "../../../../redux/actions/userActions";

//CSS
import "./UserBox.css";
import Loader from "../../../Loader/Loader";
import { CLEAR_CART } from "../../../../redux/types";

const UserBox = (props) => {
  const { name } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  if(name){
    var nameMarkUp = [...name].splice(0,1)

  }
  return (
    <Fragment>
      <div className="user-box-dropdown">
        {name ? <div className="user-box">{nameMarkUp}</div> : <Loader />}
        <div className="user-dropdown-content">
          <button
            className="user-dropdown-button"
            onClick={() => {
              dispatch(logoutUser());
              dispatch({type: CLEAR_CART})
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
