import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./OrderTab.css";
import { getAllOrder } from "../../firebase/firebase";
import { setOrder } from "../../redux/actions/orderActions";
import OrderTabDetails from "../OrderTabDetails/OrderTabDetails";
const OrderTab = ({ setOrder, order: { orders } }) => {
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllOrder();
      console.log(result);
      if (result && result.length > 0) {
        setOrder(result);
      }
    };

    fetchData();
  }, []);
  console.log(orders);
  let orderMarkUp = orders.map((item) => (
    <OrderTabDetails
      key={item.orderId}
      orderId={item.orderId}
      createdAt={item.createdAt}
      status={item.status}
      products={item.products}
    />
  ));
  return (
    <div className="order-tab-container">
      <div className="order-tab-title">
        <span>ORDER ID</span>
        <span>ORDERED DATE</span>
        <span>DETAIL</span>
        <span>TOTAL</span>
        <span>STATUS</span>
      </div>
      {orderMarkUp}
    </div>
  );
};

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps, { setOrder })(OrderTab);
