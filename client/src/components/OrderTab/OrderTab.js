import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllOrder } from "../../firebase/firebase";
import {
  setOrder,
  markComplete,
  markCancel,
} from "../../redux/actions/orderActions";
import OrderTabDetails from "../OrderTabDetails/OrderTabDetails";
import "./OrderTab.css";
import logo from "../../Images/logo.png";
import prev from "../../Images/prev.png";
import next from "../../Images/next.png";
import AdminDashboardMenu from "../AdminDashboardMenu/AdminDashboardMenu";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import PageButton from "../PageButton/PageButton";
import Loader from "../Loader/Loader";
const OrderTab = ({
  setOrder,
  order: { orders, orderReducerStatus, loadingOrder },
  markComplete,
  markCancel,
  location,
}) => {
  let params = new URLSearchParams(location.search);
  const page = params.get("page") || 1;
  const pageArray = [1, 2, 3, 4, 5];
  const handlePrevPage = () => {
    if (page > 1) {
      params.set("page", Number(page) - 1);
      window.location.search = params;
    }
  };
  const handleNextPage = () => {
    params.set("page", Number(page) + 1);
    window.location.search = params;
  };
  console.log(page);
  useEffect(() => {
    setOrder(page);
  }, []);
  const handleMarkComplete = async (orderId) => {
    await markComplete(orderId);
  };
  const handleMarkCancel = async (orderId) => {
    console.log("hello");
    await markCancel(orderId);
  };
  let orderMarkUp =
    orders.length > 0 ? (
      orders.map((item, index) => (
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
          loadingOrder={loadingOrder}
        />
      ))
    ) : (
      <Loader />
    );
  let pageMarkUp = pageArray.map((item, index) => (
    <PageButton pageNum={item} key={index} tab={"orders"} />
  ));
  console.log(orders);
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
          <div className={orders.length > 0 ? "order-tab-container" : "order-tab-container-loading"}>
            <div className={orders.length > 0 ? "order-tab-title" : "order-tab-title-loading"}>
              <span className="order-tab-id">ORDER ID</span>
              <span className="order-tab-time">ORDERED DATE</span>
              <span className="order-tab-product">DETAIL</span>
              <span className="order-tab-total">TOTAL</span>
              <span className="order-tab-status">STATUS</span>
            </div>
            {orderMarkUp}
            <div className={orders.length > 0? "order-tab-page-button-container" : "order-tab-page-button-container-loading"}>
              <div className="product-tab-page-button" onClick={handlePrevPage}>
                <img src={prev} alt="" />
              </div>
              {pageMarkUp}
              <div className="product-tab-page-button" onClick={handleNextPage}>
                <img src={next} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  order: state.order,
});
export default connect(mapStateToProps, { setOrder, markComplete, markCancel })(
  OrderTab
);
