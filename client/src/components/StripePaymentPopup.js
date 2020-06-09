import React, { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import StripeCheckoutForm from "./StripeCheckoutForm";
import ButtonStatic from "./buttons/ButtonStatic";

import useStyles from "../styles/components/StripePaymentPopupStyles";

import sprites from "../img/svg/sprites.svg";
import { useHistory } from "react-router-dom";

// Load stripe as a promise
const stripePromise = loadStripe("pk_test_ATPJil7rjAI6NefMCT1Cr10100QtHkMk19");

const StripePaymentPopup = ({ customerDetails, popupOpen, closePopup }) => {
  //Styles
  const classes = useStyles();

  // history
  const history = useHistory();

  const closeAndRedirect = (orderId, type = "success") => {
    if (type === "success") {
      // Close the popup
      closePopup();

      // Redirect to success page
      history.push(`/order/${orderId}?payment=true`);
    }
  };

  return (
    <div className={classes.StripePaymentPopup}>
      <div
        className={`${classes.StripePaymentPopup_overlay} ${
          popupOpen && classes.StripePaymentPopup_overlay_show
        }`}
        onClick={() => {
          closePopup();
        }}
      ></div>
      <div
        className={`${classes.StripePaymentPopup_popup} ${
          popupOpen && classes.StripePaymentPopup_popup_show
        }`}
      >
        <svg
          className={classes.StripePaymentPopup_popup_close}
          onClick={() => closePopup()}
        >
          <use xlinkHref={`${sprites}#icon-close`}></use>
        </svg>
        <Elements stripe={stripePromise}>
          <StripeCheckoutForm
            customerDetails={customerDetails}
            closeAndRedirect={closeAndRedirect}
          />
        </Elements>
      </div>
    </div>
  );
};

export default StripePaymentPopup;
