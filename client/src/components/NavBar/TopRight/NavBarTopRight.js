import React from 'react'

import { Link } from 'react-router-dom'

import cartIcon from '../../../Images/cart.png'
import Register from '../../Register/Register'

import './NavBarTopRight.css'

const NavBarTopRight = () => {
    return (
        <div className='topRightContainer'>
            <Register />
            <span>Log In</span>
            <img src={cartIcon}></img>
        </div>
    )
}


export default NavBarTopRight;
