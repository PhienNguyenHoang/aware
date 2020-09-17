import React, { useState } from "react";
import { connect } from 'react-redux'

import "./RegisterForm.css";

import { signupUser } from "../../../redux/actions/userActions";

const RegisterForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsOpen } = props;
  const { signupUser } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    let newUserData = {
      name: name,
      email: email,
      password: password,
    };
    signupUser(newUserData);
    setIsOpen(false);
  };

  return (
    <div className="form-container">
      <span className="form-title">Register</span>
      <form className="form-body" onSubmit={handleSubmit}>
        <span className="form-label">Name:</span>
        <div className="input-field-container">
          <input
            className="input-field"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></input>
        </div>
        <span className="form-label">Email:</span>
        <div className="input-field-container">
          <input
            className="input-field"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></input>
        </div>
        <span className="form-label">Password:</span>
        <div className="input-field-container">
          <input
            className="input-field"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
        </div>
        <div className="form-dialog">
          By creating an account you agree to the Terms of Service and Privacy Policy.
        </div>
        <button type="submit" className="form-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default connect(null, {signupUser})(RegisterForm);
