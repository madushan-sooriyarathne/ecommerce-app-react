import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";

import { firestore } from "../utils/FirebaseUtils";

import { getCurrentUser } from "../redux/reducers/user/UserSelectors";
import { connect } from "react-redux";

import Page from "./Page";

import HeadingPrimarySlim from "../components/headings/HeadingPrimarySlim";
import HeadingSecondarySlim from "../components/headings/HeadingSecondarySlim";
import HeadingSecondary from "../components/headings/HeadingSecondary";
import BoxSpinner from "../components/loading-animations/BoxSpinner";
import CartItem from "../components/CartItem";
import ButtonAnimated from "../components/buttons/ButtonAnimated";
import ButtonStatic from "../components/buttons/ButtonStatic";

import useStyles from "../styles/pages/OrderStyles";

const Order = ({ currentUser }) => {
  const classes = useStyles();

  // match object
  const match = useRouteMatch();

  //history object
  const history = useHistory();

  // this page is rendered differently based on from where user is coming from
  // if user is redirected to this page after a successful payment
  // display payment successful message on top of the page.
  // otherwise display the normal order page.
  // in-order to decide from where user is coming from
  // we have to read the url and extract a query string (if there is one)
  // TODO: maybe there is a better way to do this. but at the moment i have no idea

  const currentPageUrl = new URL(document.location.href);
  const fromPayment = currentPageUrl.searchParams.get("payment");

  const [order, setOrder] = useState(null);

  // when component get mounted, load the order data from firebase
  useEffect(() => {
    const productCollectionRef = firestore
      .collection("orders")
      .where("userId", "==", `${currentUser.uid}`);

    const unsubscribeToOrder = productCollectionRef.onSnapshot(
      (collectionSnapShot) => {
        setOrder(
          collectionSnapShot.docs.filter(
            (doc) => doc.id === match.params.order_id
          )
        );
      }
    );
    return () => unsubscribeToOrder();
  }, [match.params.order_id, currentUser.uid, order]);

  return (
    <Page>
      {order ? (
        order.length < 1 ? (
          <div className={classes.Container}>
            <HeadingPrimarySlim styles={{ color: "red", marginBottom: "5rem" }}>
              Sorry! We cannot find this order.
            </HeadingPrimarySlim>
            <ButtonStatic isSmall={true} onClick={() => history.push("/")}>
              Head Back to Home Page
            </ButtonStatic>
          </div>
        ) : (
          <div className={classes.Order}>
            {fromPayment && (
              <div className={classes.Order_heading}>
                <HeadingPrimarySlim styles={{ marginBottom: "1rem" }}>
                  Payment Complete!
                </HeadingPrimarySlim>
                <HeadingSecondarySlim>
                  Your order is placed. We have sent the receipt to your email
                </HeadingSecondarySlim>
              </div>
            )}

            <div className={classes.Order_OrderSummery}>
              <div className={classes.OrderSummery_heading}>
                <HeadingSecondary styles={{ marginRight: "1rem" }}>
                  Your Order
                </HeadingSecondary>
                <p className={classes.OrderSummery_orderNumber}>
                  {match.params.order_id.replace("ch_", "")}
                </p>
              </div>
              <div className={classes.OrderSummery_itemList}>
                {order[0].data().products.map((product) => (
                  <CartItem isPurchased={true} item={product} />
                ))}
              </div>
              <div className={classes.OrderSummery_buttonSet}>
                <ButtonAnimated
                  isSmall={true}
                  onClick={() =>
                    history.push(`/order_tracking/${match.params.order_id}`)
                  }
                >
                  Track My Order
                </ButtonAnimated>
                <ButtonAnimated
                  isSmall={true}
                  onClick={() => history.push("/")}
                >
                  Head back to home page
                </ButtonAnimated>
              </div>
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

export default connect(mapStateToProps, null)(Order);
