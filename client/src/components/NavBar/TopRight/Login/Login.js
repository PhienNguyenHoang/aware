import React, { useState } from "react";
import { connect } from "react-redux";

import { resetUserError } from "../../../../redux/actions/userActions";
import Modal from "react-modal";
import LoginForm from "./LoginForm/LoginForm";

import styles from "./Login.module.css";

const Login = ({ user: { status, error }, resetUserError }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    resetUserError();
    setIsOpen(false);
  };
  return (
    <div>
      <button className={styles.Button} onClick={handleOpenModal}>
        Login
      </button>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={handleCloseModal}
        className={styles.Modal}
        overlayClassName="Overlay"
      >
        <LoginForm setIsOpen={setIsOpen} status={status} error={error} />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { resetUserError })(Login);
