import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import "./OrderTab.css";
import { getAllOrder, markOrderComplete } from "../../firebase/firebase";
import { setOrder, markComplete } from "../../redux/actions/orderActions";
import OrderTabDetails from "../OrderTabDetails/OrderTabDetails";
const OrderTab = ({
  setOrder,
  order: { orders, orderReducerStatus },
  markComplete,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      console.log("render")
      const result = await getAllOrder();
      if (result && result.length > 0) {
        setOrder(result);
      }
    };
    fetchData();
  }, [orderReducerStatus]);
  const handleClick = (orderId) => {
    markComplete(orderId);
  };
  console.log(orderReducerStatus);
  let orderMarkUp = orders.map((item) => (
    <OrderTabDetails
      key={item.orderId}
      orderId={item.orderId}
      createdAt={item.createdAt}
      status={item.status}
      products={item.products}
      handleClick={handleClick}
      orderReducerStatus={orderReducerStatus}
    />
  ));
  return (
    <div className="order-tab-container">
      <div className="order-tab-title">
        <span className="order-tab-id">ORDER ID</span>
        <span className="order-tab-time">ORDERED DATE</span>
        <span className="order-tab-product">DETAIL</span>
        <span className="order-tab-total">TOTAL</span>
        <span className="order-tab-status">STATUS</span>
      </div>
      {orderMarkUp}
    </div>
  );
};

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps, { setOrder, markComplete })(OrderTab);
