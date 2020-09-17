import React, { useState } from "react";
import { connect } from 'react-redux'

import styles from './LoginForm.module.css';

import unchecked from '../../../../../Images/unchecked-box.png'

const LoginForm = () => {
    return (
        <div className={styles.formContainer}>
            <span className={styles.formTitle}>Log In</span>
            <form className={styles.formBody}>
                <span className={styles.formLabel}>E-MAIL</span>
                <div className={styles.inputFieldContainer}>
                    <input className={styles.inputField}/>
                </div>
                <span className={styles.formLabel}>PASSWORD</span>
                <div className={styles.inputFieldContainer}>
                    <input className={styles.inputField}/>
                </div>
                <div className={styles.flexSpaceBetween}>
                    <input type="checkbox" id="checkbox" className={styles.checkbox}></input>
                    <label for="checkbox"><img/></label>
                    <span>Forgot your password?</span>
                </div>
            </form>
        </div>
    )
}


export default LoginForm;