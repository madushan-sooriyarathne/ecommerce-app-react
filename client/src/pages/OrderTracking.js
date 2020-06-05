import React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";

import Page from "./Page";

import HeadingSecondary from "../components/headings/HeadingSecondary";
import HeadingSecondarySlim from "../components/headings/HeadingSecondarySlim";
import ButtonAnimated from "../components/buttons/ButtonAnimated";

import useStyles from "../styles/pages/OrderTrackingStyles";

import preppingImg from "../img/svg/preparing.svg";
import deliveringImg from "../img/svg/delivering.svg";
import deliveredImg from "../img/svg/delivered.svg";

const ORDER_STATUS = [
  {
    name: "Prepping",
    description: "We are preparing your order",
    img: preppingImg,
  },
  {
    name: "Delivering",
    description: "Your order is on it's way to you",
    img: deliveringImg,
  },
  {
    name: "Delivered",
    description: "Your package has been delivered",
    img: deliveredImg,
  },
];

const order = {
  customer_name: "Madushan Sooriyarathne",
  email: "sooriyarathna1997@gmail.com",
  order_state: 1,
  carrier: {
    name: "Grasshoper",
    carrier_tracking_number: "000100203",
    url: "https://www.grasshoppers.lk",
  },
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
};

const OrderTracking = () => {
  // styles
  const classes = useStyles();

  // match object
  const match = useRouteMatch();

  // history Object
  const history = useHistory();

  return (
    <Page>
      <div className={classes.OrderTracking}>
        <div className={classes.OrderTracking_heading}>
          <HeadingSecondary styles={{ marginRight: "1rem" }}>
            Order Status
          </HeadingSecondary>
          <HeadingSecondarySlim>#{match.params.order_id}</HeadingSecondarySlim>
        </div>
        <div className={classes.OrderTracking_detailsTable}>
          <div className={classes.DetailsTable_row}>
            <p className={classes.Row_key}>Customer Name</p>
            <p className={classes.Row_value}>{order.customer_name}</p>
          </div>
          <div className={classes.DetailsTable_row}>
            <p className={classes.Row_key}>Order Date</p>
            <p className={classes.Row_value}>{order.order_date.toString()}</p>
          </div>
          <div className={classes.DetailsTable_row}>
            <p className={classes.Row_key}>Ship Date</p>
            <p className={classes.Row_value}>
              {order.ship_date ? order.ship_date.toString() : "Not yet shipped"}
            </p>
          </div>
          <div className={classes.DetailsTable_row}>
            <p className={classes.Row_key}>Shipping Address</p>
            <p
              className={classes.Row_value}
            >{`${order.address.street_line_one}, ${order.address.street_line_two}, ${order.address.city}, ${order.address.country}`}</p>
          </div>
          <div className={classes.DetailsTable_row}>
            <p className={classes.Row_key}>Carrier</p>
            <p className={classes.Row_value}>{order.carrier.name}</p>
          </div>
          <div className={classes.DetailsTable_row}>
            <p className={classes.Row_key}>Carrier Tracking Number</p>
            <p className={classes.Row_value}>
              <a
                href={order.carrier.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {order.carrier.carrier_tracking_number}
              </a>
            </p>
          </div>
        </div>
        <div className={classes.OrderTracking_Status}>
          {ORDER_STATUS.map((state, index) => {
            return (
              <div
                className={`${classes.Status_box} ${
                  index === order.order_state && classes.Status_box_show
                }`}
              >
                <img
                  className={classes.Status_box_img}
                  src={state.img}
                  alt={state.name}
                ></img>
                <h3 className={classes.Status_box_heading}>{state.name}</h3>
                <p className={classes.Status_box_description}>
                  {state.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className={classes.OrderTracking_Buttons}>
          <ButtonAnimated isSmall={true} onClick={() => history.push("/")}>
            Head back to home page
          </ButtonAnimated>
        </div>
      </div>
    </Page>
  );
};

export default OrderTracking;
