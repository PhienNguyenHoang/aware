import React from "react";

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
        <a href="/">
          <img alt="" className="navbar-logo" src={logo}></img>
        </a>
        <NavBarTopRight />
      </div>
      <div className="lowerBar">
        <div className="menu-container">
          <div className="flex">
            <span>Men</span>
            <div className="dropdown1">
              <img alt="" className="dropIcon" src={dropIcon} />
              <div className="dropdown-content1">
                <a href="/product?ct=men&t=top" className="anchor">
                  Tops
                </a>
                <a href="/product?ct=men&t=bottom" className="anchor">
                  Bottoms
                </a>
                <a href="/product?ct=men&t=jacket" className="anchor">
                  Jackets
                </a>
              </div>
            </div>
          </div>
          <div className="flex">
            <span>Ladies</span>
            <div className="dropdown2">
              <img alt="" className="dropIcon" src={dropIcon} />
              <div className="dropdown-content2">
                <a href="/product?ct=ladies&t=top" className="anchor">
                  Tops
                </a>
                <a href="/product?ct=ladies&t=bottom" className="anchor">
                  Bottoms
                </a>
                <a href="/product?ct=ladies&t=dress" className="anchor">
                  Dresses
                </a>
                <a href="/product?ct=ladies&t=jacket" className="anchor">
                  Jackets
                </a>
              </div>
            </div>
          </div>
          <div className="flex">
            <span>Girls</span>
            <div className="dropdown3">
              <img alt="" className="dropIcon" src={dropIcon} />
              <div className="dropdown-content3">
                <a href="/product?ct=girl&t=top" className="anchor">
                  Tops
                </a>
                <a href="/product?ct=girl&t=bottom" className="anchor">
                  Bottoms
                </a>
                <a href="/product?ct=girl&t=dress" className="anchor">
                  Dresses
                </a>
                <a href="/product?ct=girl&t=jacket" className="anchor">
                  Jackets
                </a>
              </div>
            </div>
          </div>
          <div className="flex">
            <span>Boys</span>
            <div className="dropdown4">
              <img alt="" className="dropIcon" src={dropIcon} />
              <div className="dropdown-content4">
                <a href="/product?ct=boy&t=top" className="anchor">
                  Tops
                </a>
                <a href="/product?ct=boy&t=bottom" className="anchor">
                  Bottoms
                </a>
                <a href="/product?ct=boy&t=jacket" className="anchor">
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
