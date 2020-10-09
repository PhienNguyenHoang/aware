import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import dropdown from  '../../../../Images/dropdown.png'
import "./DashboardProductCard.css";
const DashboardProductCard = ({
  name,
  customerType,
  category,
  createdAt,
  imageUrl,
  index
}) => {
  dayjs.extend(relativeTime);
  return (
    <div className="dashboard-card-container" style={index % 2 == 0 ? null : {backgroundColor: "#f6f6f6"}}>
      <div className="card-product-details-container">
        <img src={imageUrl} alt="" />
        <div className="card-product-details">
          {/* {name} {customerType} {category} */}
          <div className="card-product-details-name">{name}</div>
          <div className="card-product-details-small">
            {customerType}/{category}
          </div>
        </div>
      </div>
      <div className="card-createdAt">{createdAt}</div>
      <div className="card-action-button">
          <span>Actions</span>
          <img src={dropdown} alt=""/>
      </div>
    </div>
  );
};

export default DashboardProductCard;
