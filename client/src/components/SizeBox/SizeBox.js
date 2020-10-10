import React from "react";
import {withRouter} from 'react-router-dom'
import "./SizeBox.css";
const SizeBox = ({ size, isActive, toggleCss, location }) => {
  // const [classCss, setClassCss] = useState('')
  // const handleClick = () => {
  //     if(classCss == 'size-box-container-checked'){
  //         setClassCss('')
  //     }
  //     else {
  //         setClassCss('size-box-container-checked')
  //     }
  // }
  console.log(location)
  const setQueryParams = () => {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set("size", size);
    window.location.search = searchParams;
  }
  return (
    <div
      className={`size-box-container ${
        isActive ? "size-box-container-checked" : ""
      }`}
      onClick={() => {
        toggleCss(size);
        setQueryParams()
      }}
    >
      {size}
    </div>
  );
};
export default withRouter(SizeBox);
