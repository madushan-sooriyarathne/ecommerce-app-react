import React from "react";

import HeadingPrimarySlim from "../components/headings/HeadingPrimarySlim";
import HeadingSecondarySlim from "../components/headings/HeadingSecondarySlim";

import Page from "./Page";

import useStyles from "../styles/pages/OrderSuccessStyles";
import HeadingSecondary from "../components/headings/HeadingSecondary";
import { useRouteMatch, useHistory } from "react-router-dom";
import CartItem from "../components/CartItem";
import ButtonAnimated from "../components/buttons/ButtonAnimated";

const orders = {
  "10203040": {
    customer_name: "Madushan Sooriyarathne",
    email: "sooriyarathna1997@gmail.com",
    order_state: {state: 0, name: "Preping", description: "We are preparing your order"},
    carrier: {name: "Grasshoper", carrier_tracking_number: "000100203", url: "www.grasshoppers.lk/tracking/"},
    phoneNumber: "077 1068301",
    order_number: "10203040",
    order_date: new Date(),
    ship_date: null,
    address: {
      country: "Sri Lanka",
      postal_code: "00300",
      city: "Colombo 03",
      street_line_one: "SUN CITY, No 18 2/2",
      street_line_two: "St. Anothony's Mawatha",
    },
    products: {
      KaLvcvSXIh2kmKFaWnBE: {
        id: "KaLvcvSXIh2kmKFaWnBE",
        img:
          "https://firebasestorage.googleapis.com/v0/b/winter-70a60.appspot.com/o/products%2F7043535006074875.jpeg?alt=media&token=c3ae4d18-86f4-482d-8e2f-149ce021c57f",
        ratings: 4.5,
        name: "Long Sleeve Shirt",
        category: "men",
        price: 3250,
        isAvailable: { xl: 10 },
        isFavorite: true,
        qtc: 1,
      },
      KaLvcvSXIh2kmKFaWn200: {
        id: "KaLvcvSXIh2kmKFaWn200",
        img:
          "https://firebasestorage.googleapis.com/v0/b/winter-70a60.appspot.com/o/products%2F7043535006074875.jpeg?alt=media&token=c3ae4d18-86f4-482d-8e2f-149ce021c57f",
        ratings: 4.5,
        name: "Long Sleeve Shirt",
        category: "men",
        price: 3250,
        isAvailable: { xl: 10 },
        isFavorite: true,
        qtc: 1,
      },
    },
  },
};

const OrderSuccess = () => {
  const classes = useStyles();

  // match object
  const match = useRouteMatch();

  //history object
  const history = useHistory();

  console.log();

  return (
    <Page>
      <div className={classes.OrderSuccess}>
        <div className={classes.OrderSuccess_heading}>
          <HeadingPrimarySlim styles={{ marginBottom: "1rem" }}>
            Payment Complete!
          </HeadingPrimarySlim>
          <HeadingSecondarySlim>
            Your order is placed. We have sent the receipt to your email
          </HeadingSecondarySlim>
        </div>
        <div className={classes.OrderSuccess_OrderSummery}>
          <div className={classes.OrderSummery_heading}>
            <HeadingSecondary styles={{ marginRight: "1rem" }}>
              Your Order
            </HeadingSecondary>
            <p className={classes.OrderSummery_orderNumber}>#10203040</p>
          </div>
          <div className={classes.OrderSummery_itemList}>
            {Object.values(orders[match.params.order_id].products).map(
              (product) => (
                <CartItem isPurchased={true} item={product} />
              )
            )}
          </div>
          <div className={classes.OrderSummery_buttonSet}>
            <ButtonAnimated
              isSmall={true}
              onClick={() => history.push(`/order/${match.params.order_id}`)}
            >
              Track My Order
            </ButtonAnimated>
            <ButtonAnimated isSmall={true} onClick={() => history.push("/")}>
              Head back to home page
            </ButtonAnimated>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default OrderSuccess;
