import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import {
  toggleCartMenu,
  closeCartMenu,
} from "../redux/reducers/cart-menu/CartMenuAction";

import ButtonStatic from "./buttons/ButtonStatic";
import CartMenuItem from "./CartMenuItem";
import HeadingTertiary from "./headings/HeadingTertiary";

import useStyles from "../styles/components/CartDropDownMenuStyles";

import sprites from "../img/svg/sprites.svg";
import emptyImage from "../img/svg/cart-empty.svg";

const CartDropDownMenu = ({
  closeCartMenu,
  toggleCartMenu,
  cartMenuOpened,
  cartList,
}) => {
  //hooks
  const history = useHistory();

  useEffect(() => {
    // Listen to route change event and close the drop down menu when the current route changes
    const unsubscribeToHistory = history.listen((location, action) => {
      closeCartMenu();
    });

    return () => unsubscribeToHistory();
  }, [closeCartMenu, history]);

  // Handle Redirect Button Click
  const handleCartPageRedirect = (event) => {
    //close the cart menu
    closeCartMenu();

    history.push("/cart");
  };

  const classes = useStyles();
  return (
    <div className={classes.CartDropDownMenu}>
      <div
        className={classes.CartDropDownMenu_badge}
        onClick={(event) => {
          toggleCartMenu();
        }}
      >
        <svg className={classes.CartDropDownMenu_icon}>
          <use xlinkHref={`${sprites}#icon-cart`}></use>
        </svg>
        <div className={classes.CartDropDownMenu_number}>
          {cartList.reduce((acc, cur) => acc + cur.qtc, 0)}
        </div>
      </div>
      <div
        className={`${classes.CartDropDownMenu_overlay} ${
          cartMenuOpened && classes.CartDropDownMenu_overlay_show
        }`}
        onClick={(event) => closeCartMenu()}
      ></div>
      <div
        className={`${classes.CartDropDownMenu_dropdown_list} ${
          cartMenuOpened && classes.CartDropDownMenu_dropdown_list_open
        } cart-menu-dropdown`}
      >
        {cartList.length < 1 ? (
          <div className={classes.CartDropDownMenu_empty}>
            <img
              src={emptyImage}
              alt="cart is empty"
              className={classes.CartDropDownMenu_empty_img}
            ></img>
            <p className={classes.CartDropDownMenu_empty_msg}>
              Your cart is currently empty. Get more shopping done.
            </p>
          </div>
        ) : (
          <>
            <HeadingTertiary styles={{ marginBottom: "2rem" }}>
              Latest Cart Items
            </HeadingTertiary>
            <div className={classes.CartDropDownMenu_items}>
              {cartList.map((item) => (
                <CartMenuItem
                  imgURL={item.imgURL}
                  name={item.name}
                  qtc={item.qtc}
                  price={parseFloat(item.price)}
                  key={item.id}
                />
              ))}
            </div>

            <ButtonStatic
              primaryColor="var(--color-primary)"
              isSmall={true}
              onClick={handleCartPageRedirect}
              style={{ alignSelf: "stretch", marginTop: "auto" }}
            >
              View Full Cart
            </ButtonStatic>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartMenuOpened: state.cartMenu.cartMenuOpened,
  cartList: state.cartList.cartList,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartMenu: () => dispatch(toggleCartMenu()),
  closeCartMenu: () => dispatch(closeCartMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDropDownMenu);
