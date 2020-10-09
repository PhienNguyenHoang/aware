import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { getAllOrder } from "../../firebase/firebase";
import { setOrder, markComplete, markCancel } from "../../redux/actions/orderActions";
import OrderTabDetails from "../OrderTabDetails/OrderTabDetails";
import "./OrderTab.css";
import logo from "../../Images/logo.png";
import AdminDashboardMenu from "../AdminDashboardMenu/AdminDashboardMenu";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
const OrderTab = ({
  setOrder,
  order: { orders, orderReducerStatus },
  markComplete,
  markCancel
}) => {
  useEffect(() => {
    // const fetchData = async () => {
    //   console.log("render");
    //   const result = await getAllOrder();
    //   if (result && result.length > 0) {
    //     setOrder(result);
    //   }
    // };
    // fetchData();
    setOrder()
  }, []);
  const handleMarkComplete = async (orderId) => {
    await markComplete(orderId);
    setOrder();
  };
  const handleMarkCancel = async (orderId) => {
    await markCancel(orderId);
    setOrder();
  }
  console.log(orderReducerStatus);
  let orderMarkUp = orders.map((item, index) => (
    <OrderTabDetails
      key={item.orderId}
      index={index}
      orderId={item.orderId}
      createdAt={item.createdAt}
      status={item.status}
      products={item.products}
      handleMarkComplete={handleMarkComplete}
      handleMarkCancel={handleMarkCancel}
      orderReducerStatus={orderReducerStatus}
    />
  ));
  return (
    <div className="dashboard-container">
      <div className="dashboard-menu">
        <div className="admin-logo-container">
          <img alt="" src={logo} />
        </div>
        <AdminDashboardMenu />
      </div>
      <div className="dashboard-content">
        <AdminNavBar />
        <div className="content-box">
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
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  order: state.order,
});
export default connect(mapStateToProps, { setOrder, markComplete, markCancel })(OrderTab);
