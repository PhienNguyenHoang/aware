import React from "react";
import "./ColorBox.css";
const ColorBox = ({ color, toggleCss, isActive }) => {
  return (
    <div className={isActive ? 'color-box-border' : ''}>
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
export default ColorBox;
