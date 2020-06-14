import React from "react";
import { connect } from "react-redux";

import {
  updateCartItem,
  removeCartItem,
} from "../redux/reducers/cart-list/CartListActions";

import Page from "./Page";
import CenteredPage from "./CenteredPage";

import HeadingPrimary from "../components/headings/HeadingPrimary";
import ButtonAnimated from "../components/buttons/ButtonAnimated";
import ButtonStatic from "../components/buttons/ButtonStatic";
import CartItem from "../components/CartItem";

import useStyles from "../styles/pages/CartStyles";

import cartEmpty from "../img/svg/cart-empty.svg";
import { useHistory } from "react-router-dom";

const Cart = (props) => {
  const classes = useStyles();

  //history hook
  const history = useHistory();

  // Redux State
  const { cartList, updateCartItem, removeCartItem } = props;

  // Default Props for subTotal and shipping (Shipping is not prone to change in this component)
  const {
    subTotal = cartList.reduce((acc, item) => item.price * item.qtc + acc, 0),
  } = props;

  //event handler functions
  const handleItemDelete = (id) => {
    // Delete cart Item from the context
    removeCartItem(id);
  };

  const handleQtcChange = (id, item) => {
    updateCartItem(id, item);
  };

  return cartList.length < 1 ? (
    <CenteredPage>
      <div className={classes.Cart_empty}>
        <img
          src={cartEmpty}
          alt="Empty Cart"
          className={classes.Cart_empty_img}
        ></img>
        <p className={classes.Cart_empty_message}>
          Your cart is currently empty. Get more shopping done.
        </p>
        <ButtonStatic
          isSmall={true}
          styles={{ alignSelf: "center", marginTop: "2rem" }}
          onClick={(event) => history.push("/shop")}
        >
          Continue shopping
        </ButtonStatic>
      </div>
    </CenteredPage>
  ) : (
    <Page>
      <div className={classes.Cart}>
        <section className={classes.Cart_productList}>
          <div className={classes.ProductList_header}>
            <HeadingPrimary>Items in your cart</HeadingPrimary>
            <ButtonAnimated
              isSmall={true}
              onClick={(event) => {
                alert("Your cart has been saved");
              }}
              styles={{ padding: "1rem", borderRadius: "3px" }}
            >
              Save Cart
            </ButtonAnimated>
          </div>
          <div className={classes.ProductList_items}>
            {cartList.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                handleDelete={handleItemDelete}
                handleQtcChange={handleQtcChange}
              />
            ))}
          </div>
        </section>
        <section className={classes.Cart_summery}>
          <div className={classes.Summery_details}>
            <div className={classes.Details_row}>
              <p className={classes.Details_heading}>Sub Total</p>
              <p className={classes.Details_value}>{`$ ${subTotal.toFixed(
                2
              )}`}</p>
            </div>
            <div className={classes.Details_row}>
              <p></p>
              <p className={classes.Details_total}>{`$ ${subTotal}`}</p>
            </div>
          </div>
          <ButtonStatic
            isSmall={true}
            onClick={(event) => {
              history.push("/checkout");
            }}
          >
            Proceed with Order
          </ButtonStatic>
          <p className={classes.Cart_summery_note}>
            *You can add coupon/discount codes at the checkout
          </p>
        </section>
      </div>
    </Page>
  );
};

//Redux Mappings
const mapStateToProps = (state) => ({
  cartList: state.cartList.cartList,
});

const mapDispatchToProps = (dispatch) => ({
  updateCartItem: (id, item) => dispatch(updateCartItem(id, item)),
  removeCartItem: (id) => dispatch(removeCartItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
