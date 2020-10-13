import React from "react";
const ProductColorBox = ({ color, toggleCss, isActive }) => {
 
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
export default ProductColorBox;
