import React from 'react'
import logo from '../../Images/logo.png'
import twitter from '../../Images/twitter-icon.png';
import facebook from '../../Images/facebook-icon.png';
import instagram from '../../Images/instagram-icon.png';
import './UpperFooter.css'
const UpperFooter = () => {
    return (
        <div className="upper-footer-container">
            <a href="/"><img src={logo} alt=""/></a>
            <div className="upper-footer-center-content">
                <a href="/">Home</a>
                <a href="/">Product</a>
                <a href="/">Services</a>
                <a href="/">About Us</a>
                <a href="/">Help</a>
                <a href="/">Contacts</a>
            </div>
            <div className="upper-footer-right-content">
                <img src={twitter} alt="" />
                <img src={facebook} alt="" />
                <img src={instagram} alt="" />
            </div>
        </div>
    )
}
export default UpperFooter;