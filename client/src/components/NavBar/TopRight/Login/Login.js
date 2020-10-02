import React from "react";

import Modal from "react-modal";
import LoginForm from "./LoginForm/LoginForm";

import styles from "./Login.module.css";
import { connect } from "react-redux";
import {
  closeLoginModal,
  openLoginModal,
} from "../../../../redux/actions/loginActions";

const Login = ({ login: { isOpenModal }, closeLoginModal, openLoginModal }) => {
  return (
    <div>
      <button className={styles.Button} onClick={openLoginModal}>
        Login
      </button>
      <Modal
        isOpen={isOpenModal}
        ariaHideApp={false}
        onRequestClose={closeLoginModal}
        className={styles.Modal}
        overlayClassName="Overlay"
      >
        <LoginForm closeLoginModal={closeLoginModal} />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps, { openLoginModal, closeLoginModal })(
  Login
);
