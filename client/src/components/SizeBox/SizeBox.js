import React from "react";
import "./SizeBox.css";
const SizeBox = ({ size, isActive, toggleCss }) => {
  // const [classCss, setClassCss] = useState('')
  // const handleClick = () => {
  //     if(classCss == 'size-box-container-checked'){
  //         setClassCss('')
  //     }
  //     else {
  //         setClassCss('size-box-container-checked')
  //     }
  // }
  return (
    <div
      className={`size-box-container ${
        isActive ? "size-box-container-checked" : ""
      }`}
      onClick={() => {
        toggleCss(size);
      }}
    >
      {size}
    </div>
  );
};
export default SizeBox;
