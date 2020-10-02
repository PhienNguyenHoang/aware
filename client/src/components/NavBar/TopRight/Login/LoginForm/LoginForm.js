import React, { useState } from "react";
import { connect } from 'react-redux'

import styles from './LoginForm.module.css';

import {loginUser} from '../../../../../redux/actions/userActions';


const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loginUser, closeLoginModal } = props;

    const handleSubmit = (event) => {
        event.preventDefault();
        let userLoginData = {
            email: email,
            password: password
        }
        loginUser(userLoginData);
        if(localStorage.getItem("productsInCart")){
            localStorage.removeItem("productsInCart");
        }
        closeLoginModal(); 
    }

    return (
        <div className={styles.formContainer}>
            <span className={styles.formTitle}>Log In</span>
            <form className={styles.formBody} onSubmit={handleSubmit}>
                <span className={styles.formLabel}>E-MAIL</span>
                <div className={styles.inputFieldContainer}>
                    <input className={styles.inputField} value={email} onChange={event => setEmail(event.target.value)}/>
                </div>
                <span className={styles.formLabel}>PASSWORD</span>
                <div className={styles.inputFieldContainer}>
                    <input className={styles.inputField} value={password} onChange={event => setPassword(event.target.value)}/>
                </div>
                <div className={styles.flexSpaceBetween}>
                    <input type="checkbox" id="checkbox" className={styles.checkbox}></input>
                    <span>Forgot your password?</span>
                </div>
                <button type="submit" className={styles.formButton}>Log In</button>
            </form>
        </div>
    )
}


export default connect(null, { loginUser })(LoginForm);