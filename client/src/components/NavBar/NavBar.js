import React from 'react'
import SearchBar from './SearchBar/SearchBar';

import './NavBar.css'

import logo from '../../Images/logo.png'
import NavBarTopRight from './TopRight/NavBarTopRight';

const NavBar = () => {
    return (
        <div className='navbar-container'>
            <div className="upperBar">
                <div className="searchBar-outter">
                <SearchBar />
                </div>
                <img className="navbar-logo" src={logo}></img>
                <NavBarTopRight />
            </div>
            <div className="lowerBar">

            </div>
        </div>
    )
}


export default NavBar;
