import React from "react";
import { withRouter } from "react-router-dom";
import "./ColorBox.css";
const ColorBox = ({ color, toggleCss, location }) => {
  let params = new URLSearchParams(location.search) 
  const colorChecked = params.get('color');
  const setQueryParams = () => {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set("color", color);
    window.location.search = searchParams;
  };
  return (
    <div className={colorChecked === color ? "color-box-border" : ""}>
      <div
        className={`color-box-container ${
          colorChecked === color ? "color-box-container-checked" : ""
        }`}
        style={{ backgroundColor: `${color}` }}
        onClick={() => {
          toggleCss(color);
          setQueryParams()
        }}
      ></div>
    </div>
  );
};
export default withRouter(ColorBox);
