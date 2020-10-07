import React from "react";
import dropdown from "../../Images/dropdown.png";
import "./OrderTabDetails.css";
import Loader from "../Loader/Loader";
const OrderTabDetails = ({ orderId, status, createdAt, products, handleClick, orderReducerStatus}) => {
  let productMarkUp = products.map(
    (item) => `${item.name} (${item.size}) x ${item.quantity}`
  );
  let total = 0;
   products.forEach(item => {
    total += item.amount
  })
  let statusMarkUp = orderReducerStatus === 'LOADING' ? <Loader /> : status;
  return (
    <div className="order-tab-details-container">
      <div className="order-tab-details-order-id">{orderId}</div>
      <div className="order-tab-details-time">{createdAt}</div>
      <div className="order-tab-details-product">{productMarkUp}</div>
      <div className="order-tab-details-total">{total}</div>
      <div className={status === "complete" ? "order-tab-details-status-complete" : status === 'pending' ? "order-tab-details-status-pending" : status === 'cancelled' ? "order-tab-details-status-cancelled" : null }>{statusMarkUp}</div>
      <div className="action-button-dropdown">
        <div className="order-tab-details-button">
          <span>Actions</span>
          <img src={dropdown} alt="" />
        </div>
        <div className="action-button-dropdown-content">
          <button className="action-button-dropdown-content-button" onClick={() => handleClick(orderId)}>
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
