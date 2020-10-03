import React, { useState } from "react";

import Modal from "react-modal";

import RegisterForm from "./RegisterForm/RegisterForm";

import "./Register.css";
import { connect } from "react-redux";
import { resetUserError } from "../../../../redux/actions/userActions";

const Register = ({user: {status, error}, resetUserError}) => {
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
      <button className="register-button" onClick={handleOpenModal}>
        Register
      </button>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={handleCloseModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <RegisterForm setIsOpen={setIsOpen} status={status} error={error}/>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {resetUserError})(Register);
