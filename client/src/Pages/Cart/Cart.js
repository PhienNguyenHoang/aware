import React from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";
import { createAnOrder, deleteUserCart } from "../../firebase/firebase";
import NavBar from "../../components/NavBar/NavBar";
import ProductInCart from "../../components/ProductInCart/ProductInCart";
import { openLoginModal } from "../../redux/actions/loginActions";
import { clearCart } from "../../redux/actions/cartActions";
import "./Cart.css";

const Cart = ({
  cart: { products },
  user: { authenticated, credentials },
  openLoginModal,
  clearCart,
}) => {
  let totalAmount = 0;
  console.log(products);
  console.log(authenticated, credentials.name);
  let productInCartMarkUp = products.map((product, index) => (
    <ProductInCart
      key={index}
      imageUrl={product.imageUrl}
      name={product.name}
      color={product.color}
      size={product.size}
      quantity={product.quantity}
      amount={product.amount}
    />
  ));
  products.forEach((item) => {
    totalAmount += item.amount;
  });
  const handleCheckOut = async () => {
    if (!authenticated) {
      openLoginModal();
    } else {
      const orderDetails = {
        products: products,
        orderId: nanoid(7).split("-").join(""),
        userId: credentials.userId,
        status: "pending",
      };
      const result = await createAnOrder(orderDetails);
      if (result === "successfully") {
          alert("order created succefully");
          await deleteUserCart(credentials.userId);
          clearCart();
      }
    }
  };
  return (
    <div>
      <NavBar />
      <div className="cart-content">
        <div>My Bag</div>
        <div className="grid grid-cols-3 gap-4 cart-customize-container">
          <div className="col-span-2 cart-customize cart-customize-product">
            <div className="cart-product-title">
              <span>Product</span>
              <span className="cart-product-title-color">Color</span>
              <span className="cart-product-title-size">Size</span>
              <span className="cart-product-title-quantity">Quantity</span>
              <span className="cart-product-title-amount">Amount</span>
            </div>
            {productInCartMarkUp}
          </div>
          <div className="col-span-1 cart-customize cart-customize-checkout">
            <span>Total</span>
            <div className="cart-total-box">
              <div className="cart-total-flex">
                <span>Shipping & handling</span>
                <span>Free</span>
              </div>
              <div className="cart-total-flex cart-total-bottom-border">
                <span>Total product:</span>
                <span>$ {totalAmount}.00</span>
              </div>
              <div className="cart-total-flex">
                <span>Subtotal</span>
                <span>value</span>
              </div>
            </div>
            <div className="cart-checkout-container">
              <button onClick={handleCheckOut}>Check out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart,
});

export default connect(mapStateToProps, { openLoginModal, clearCart })(Cart);
