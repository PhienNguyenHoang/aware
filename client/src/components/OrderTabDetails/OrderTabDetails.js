import React from "react";
import dropdown from "../../Images/dropdown.png";
import "./OrderTabDetails.css";
const OrderTabDetails = ({ orderId, status, createdAt, products }) => {
  let productMarkUp = products.map(
    (item) => `${item.name} (${item.size}) x ${item.quantity}`
  );
  return (
    <div className="order-tab-details-container">
      <div className="order-tab-details-order-id">{orderId}</div>
      <div className="order-tab-details-time">{createdAt}</div>
      <div className="order-tab-details-product">{productMarkUp}</div>
      <div className="order-tab-details-status">{status}</div>
      <div className="action-button-dropdown">
        <div className="order-tab-details-button">
          <span>Actions</span>
          <img src={dropdown} alt="" />
        </div>
        <div className="action-button-dropdown-content">
          <button className="action-button-dropdown-content-button">
            <div className="peagreen-oval"></div>
            <span>Mark as Complete</span>
          </button>
          <button className="action-button-dropdown-content-button">
            <div className="red-oval"></div>
            <span>Mark as Canceled</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default OrderTabDetails;
