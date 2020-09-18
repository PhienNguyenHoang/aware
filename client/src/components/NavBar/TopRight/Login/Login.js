import React, { useState } from "react";

import Modal from "react-modal";
import LoginForm from "./LoginForm/LoginForm";

import styles from './Login.module.css'

const Login = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };


  return (
    <div>
      <button className={styles.Button}onClick={handleOpenModal}>Login</button>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={handleCloseModal}
        className={styles.Modal}
        overlayClassName="Overlay"
      >
        <LoginForm setIsOpen={setIsOpen}/>
      </Modal>
    </div>
  );
};

export default Login;
