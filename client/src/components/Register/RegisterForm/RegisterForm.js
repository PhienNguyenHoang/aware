import React from "react";

import "./RegisterForm.css";

const RegisterForm = () => {
  return (
    <div className="form-container">
      <h2 className="form-title">Register</h2>
      <form className="form-body">
        <span>Name:</span>
        <div className="input-field-container">
          <input className="input-field"></input>
        </div>
        <span>Name:</span>
        <div className="input-field-container">
          <input className="input-field"></input>
        </div>
        <span>Name:</span>
        <div className="input-field-container">
          <input className="input-field"></input>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
