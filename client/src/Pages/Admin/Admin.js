import React, { useState } from "react";
import "./Admin.css";
import { loginAdmin } from "../../redux/actions/userActions";
import { connect } from "react-redux";
const Admin = ({ loginAdmin, history }, { user: authenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    let adminLoginData = {
      email: email,
      password: password,
    };
    loginAdmin(adminLoginData, history);
  };
  return (
    <div className="admin-page-container">
      <div className="admin-login-container">
        <span className="form-title">Log In</span>
        <form className="form-body" onSubmit={handleSubmit}>
          <span className="form-label">E-MAIL</span>
          <div className="input-field-container">
            <input
              className="input-field"
              placeholder="email@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <span className="form-label">PASSWORD</span>
          <div className="input-field-container">
            <input
              type="password"
              className="input-field"
              placeholder="Enter password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <button type="submit" className="form-button">
            Log In
          </button>
          <div className="forgot-password">
            <span>Forgot your password?</span>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { loginAdmin })(Admin);
