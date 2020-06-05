import React from "react";
import StripeCheckout from "react-stripe-checkout";

import ButtonStatic from "./buttons/ButtonStatic";

const CheckoutButton = ({ amount, handleFormSubmit }) => {
  const onToken = (token) => {
    handleFormSubmit();

    alert("Payment received");
    console.log(token);
  };

  // Configuration for the payment model
  const configs = {
    name: "Winter Fashion Ltd.", // the pop-in header title
    description: `Proceed to pay $ ${amount}`, // the pop-in header subtitle
    image: "https://stripe.com/img/documentation/checkout/marketplace.png", // the pop-in header image (default none)
    ComponentClass: "span",
    label: `Pay $ ${amount}`, // text inside the Stripe button
    panelLabel: "Pay", // prepended to the amount in the bottom pay button
    amount: amount * 100, // cents
    currency: "USD",
    stripeKey: process.env.REACT_APP_STRIPE_KEY,
    locale: "lk",
    email: "info@winter.com",
    // Note: Enabling either address option will give the user the ability to
    // fill out both. Addresses are sent as a second parameter in the token callback.
    shippingAddress: false,
    billingAddress: false,
    // Note: enabling both zipCode checks and billing or shipping address will
    // cause zipCheck to be pulled from billing address (set to shipping if none provided).
    zipCode: false,
    alipay: false, // accept Alipay (default false)
    bitcoin: false, // accept Bitcoins (default false)
    allowRememberMe: true, // "Remember Me" option (default true)
    token: onToken, // submit callback
    // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
    // you are using multiple stripe keys
    reconfigureOnUpdate: false,
  };

  return (
    <StripeCheckout {...configs}>
      <ButtonStatic
        primaryColor="#3c2858"
        isSmall={true}
        styles={{ width: "100%" }}
      >
        Checkout
      </ButtonStatic>
    </StripeCheckout>
  );
};

export default CheckoutButton;
