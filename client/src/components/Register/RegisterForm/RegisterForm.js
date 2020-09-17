import React, { useState } from "react";
import { connect } from 'react-redux'

import styles from "./RegisterForm.module.css";

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
    <div className={styles.formContainer}>
      <span className={styles.formTitle}>Register</span>
      <form className={styles.formBody} onSubmit={handleSubmit}>
        <span className={styles.formLabel}>NAME</span>
        <div className={styles.inputFieldContainer}>
          <input
            className={styles.inputField}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></input>
        </div>
        <span className={styles.formLabel}>EMAIL</span>
        <div className={styles.inputFieldContainer}>
          <input
            className={styles.inputField}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></input>
        </div>
        <span className={styles.formLabel}>PASSWORD</span>
        <div className={styles.inputFieldContainer}>
          <input
            className={styles.inputField}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
        </div>
        <div className={styles.formDialog}>
          By creating an account you agree to the Terms of Service and Privacy Policy.
        </div>
        <button type="submit" className={styles.formButton}>
          Register
        </button>
      </form>
    </div>
  );
};

export default connect(null, {signupUser})(RegisterForm);
