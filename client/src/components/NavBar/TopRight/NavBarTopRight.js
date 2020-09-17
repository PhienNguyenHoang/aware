import React from 'react'

import { Link } from 'react-router-dom'

import Login from './Login/Login'
import Register from '../../Register/Register'
import cartIcon from '../../../Images/cart.png'

import './NavBarTopRight.css'

const NavBarTopRight = () => {


    return (
        <div className='topRightContainer'>
            <Register />
            <Login />
            <img src={cartIcon}></img>
        </div>
    )
}


export default NavBarTopRight;
