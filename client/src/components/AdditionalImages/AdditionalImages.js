import React from "react";
import "./AdditionalImages.css";

const AdditionalImages = ({ url, handleClickImage }) => {
  return (
    <div className="additional-images-container" onClick={() => {handleClickImage(url)}}>
      <img src={url} alt="" />
    </div>
  );
};
export default AdditionalImages;
