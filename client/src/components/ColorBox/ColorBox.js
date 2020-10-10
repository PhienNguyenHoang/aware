import React from "react";
import { withRouter } from "react-router-dom";
import "./ColorBox.css";
const ColorBox = ({ color, toggleCss, isActive }) => {
  const setQueryParams = () => {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set("color", color);
    window.location.search = searchParams;
  };
  return (
    <div className={isActive ? "color-box-border" : ""}>
      <div
        className={`color-box-container ${
          isActive ? "color-box-container-checked" : ""
        }`}
        style={{ backgroundColor: `${color}` }}
        onClick={() => toggleCss(color)}
      ></div>
    </div>
  );
};
export default withRouter(ColorBox);
