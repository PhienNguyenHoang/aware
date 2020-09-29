import React from "react";
import Banner from "../../components/Banner/Banner";
import NavBar from '../../components/NavBar/NavBar'

import "./Home.css";

const Home = () => {
  return (
    <div>
         <NavBar />
      <div className="body">
        <Banner />
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default Home;
