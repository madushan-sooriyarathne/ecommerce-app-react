import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { firestore } from "../utils/FirebaseUtils";

import Page from "./Page";

import HeadingSecondary from "../components/headings/HeadingSecondary";
import HeadingSecondarySlim from "../components/headings/HeadingSecondarySlim";
import HeadingPrimarySlim from "../components/headings/HeadingPrimarySlim";
import ButtonAnimated from "../components/buttons/ButtonAnimated";
import ButtonStatic from "../components/buttons/ButtonStatic";
import BoxSpinner from "../components/loading-animations/BoxSpinner";

import useStyles from "../styles/pages/OrderTrackingStyles";

import preppingImg from "../img/svg/preparing.svg";
import deliveringImg from "../img/svg/delivering.svg";
import deliveredImg from "../img/svg/delivered.svg";
import { getCurrentUser } from "../redux/reducers/user/UserSelectors";
import { connect } from "react-redux";

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

const OrderTracking = ({ currentUser }) => {
  // styles
  const classes = useStyles();

  // match object
  const match = useRouteMatch();

  // history Object
  const history = useHistory();

  // state
  const [order, setOrder] = useState(null);

  // When component get mounted, get the order data from firebase and update the state
  useEffect(() => {
    const productCollectionRef = firestore
      .collection("orders")
      .where("userId", "==", `${currentUser.uid}`);

    const unsubscribeToOrder = productCollectionRef.onSnapshot(
      (collectionSnapshot) => {
        setOrder(
          collectionSnapshot.docs.filter(
            (doc) => doc.id === match.params.order_id
          )
        );
      }
    );
    return () => unsubscribeToOrder();
  }, [match.params.order_id, currentUser.uid, order]);

  console.log(order);

  return (
    <Page>
      {order ? (
        order.length < 1 ? (
          <div className={classes.Container}>
            <HeadingSecondarySlim
              styles={{ color: "red", marginBottom: "5rem" }}
            >
              Sorry! We cannot find this order.
            </HeadingSecondarySlim>
            <ButtonStatic isSmall={true} onClick={() => history.push("/")}>
              Head Back to Home Page
            </ButtonStatic>
          </div>
        ) : (
          <div className={classes.OrderTracking}>
            <div className={classes.OrderTracking_heading}>
              <HeadingSecondary styles={{ marginRight: "1rem" }}>
                Order Status
              </HeadingSecondary>
              <HeadingSecondarySlim>
                #{match.params.order_id.replace("ch_", "")}
              </HeadingSecondarySlim>
            </div>
            <div className={classes.OrderTracking_detailsTable}>
              <div className={classes.DetailsTable_row}>
                <p className={classes.Row_key}>Customer Name</p>
                <p className={classes.Row_value}>{currentUser.displayName}</p>
              </div>
              <div className={classes.DetailsTable_row}>
                <p className={classes.Row_key}>Order Date</p>
                <p className={classes.Row_value}>{order[0].data().orderDate}</p>
              </div>
              <div className={classes.DetailsTable_row}>
                <p className={classes.Row_key}>Ship Date</p>
                <p className={classes.Row_value}>
                  {order[0].data().shipDate
                    ? order[0].data().shipDate
                    : "Not yet shipped"}
                </p>
              </div>
              <div className={classes.DetailsTable_row}>
                <p className={classes.Row_key}>Shipping Address</p>
                <p className={classes.Row_value}>{`${
                  order[0].data().billing_address.line1
                }, ${order[0].data().billing_address.line2}, ${
                  order[0].data().billing_address.city
                }, ${order[0].data().billing_address.country}`}</p>
              </div>
              <div className={classes.DetailsTable_row}>
                <p className={classes.Row_key}>Carrier</p>
                <p className={classes.Row_value}>
                  {order[0].data().carrier.name}
                </p>
              </div>
              <div className={classes.DetailsTable_row}>
                <p className={classes.Row_key}>Carrier Tracking Number</p>
                <p className={classes.Row_value}>
                  <a
                    href={`${order[0].data().carrier.url}${
                      order[0].data().carrier.carrier_tracking_number
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {order[0].data().carrier.carrier_tracking_number}
                  </a>
                </p>
              </div>
            </div>
            <div className={classes.OrderTracking_Status}>
              {ORDER_STATUS.map((state, index) => {
                return (
                  <div
                    className={`${classes.Status_box} ${
                      index === order[0].data().order_state &&
                      classes.Status_box_show
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
        )
      ) : (
        <div className={classes.Container}>
          <BoxSpinner />
          <HeadingPrimarySlim>Loading...</HeadingPrimarySlim>
        </div>
      )}
    </Page>
  );
};

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps, null)(OrderTracking);
