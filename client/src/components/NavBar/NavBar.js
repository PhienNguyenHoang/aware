import React, { Fragment } from "react";

import SearchBar from "./SearchBar/SearchBar";
import NavBarTopRight from "./TopRight/NavBarTopRight";

import "./NavBar.css";

import logo from "../../Images/logo.png";
import dropIcon from "../../Images/arrow.png";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <div className="upperBar">
        <SearchBar />

        <img className="navbar-logo" src={logo}></img>
        <NavBarTopRight />
      </div>
      <div className="lowerBar">
        <div className="menu-container">
          <div className="flex">
            <span>Men</span>
            <div className="dropdown1">
              <img className="dropIcon" src={dropIcon} />
              <div className="dropdown-content1">
                <a href="" className="anchor">
                  Tops
                </a>
                <a href="" className="anchor">
                  Bottoms
                </a>
                <a href="" className="anchor">
                  Dresses
                </a>
                <a href="" className="anchor">
                  Jackets
                </a>
              </div>
            </div>
          </div>
          <div className="flex">
            <span>Ladies</span>
            <div className="dropdown2">
              <img className="dropIcon" src={dropIcon} />
              <div className="dropdown-content2">
                <a href="" className="anchor">
                  Tops
                </a>
                <a href="" className="anchor">
                  Bottoms
                </a>
                <a href="" className="anchor">
                  Dresses
                </a>
                <a href="" className="anchor">
                  Jackets
                </a>
              </div>
            </div>
          </div>
          <div className="flex">
            <span>Girls</span>
            <div className="dropdown3">
              <img className="dropIcon" src={dropIcon} />
              <div className="dropdown-content3">
                <a href="" className="anchor">
                  Tops
                </a>
                <a href="" className="anchor">
                  Bottoms
                </a>
                <a href="" className="anchor">
                  Dresses
                </a>
                <a href="" className="anchor">
                  Jackets
                </a>
              </div>
            </div>
          </div>
          <div className="flex">
            <span>Boys</span>
            <div className="dropdown4">
              <img className="dropIcon" src={dropIcon} />
              <div className="dropdown-content4">
                <a href="" className="anchor">
                  Tops
                </a>
                <a href="" className="anchor">
                  Bottoms
                </a>
                <a href="" className="anchor">
                  Dresses
                </a>
                <a href="" className="anchor">
                  Jackets
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
