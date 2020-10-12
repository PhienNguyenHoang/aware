import React from "react";
import Banner from "../../components/Banner/Banner";
import NavBar from "../../components/NavBar/NavBar";

import "./Home.css";
import UpperFooter from "../../components/UpperFooter/UpperFooter";

const Home = () => {
  return (
    <div className="home-page-container">
      <NavBar />
      <div className="body">
        <Banner />
        <div className="grid grid-cols-4 gap-4 customize-home-container">
          <div className="col-span-1 customize-home home-men">
            <button className="shop-now-button">
              <a href="/product?ct=men&page=1">Shop now</a>
            </button>
          </div>
          <div className="col-span-1 customize-home home-ladies">
            <button className="shop-now-button">
              <a href="/product?ct=ladies&page=1">Shop now</a>
            </button>
          </div>
          <div className="col-span-1 customize-home home-girls">
            <button className="shop-now-button">
              <a href="/product?ct=girls&page=1">Shop now</a>
            </button>
          </div>
          <div className="col-span-1 customize-home home-boys">
            <button className="shop-now-button">
              <a href="/product?ct=boys&page=1">Shop now</a>
            </button>
          </div>
        </div>
      </div>
      <div className="footer">
        <UpperFooter />
      </div>
    </div>
  );
};

export default Home;
