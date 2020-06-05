import React from "react";

import FeatureBox from "../components/FeatureBox";

import useStyles from "../styles/layouts/FeaturesGridStyles";

import shippingImg from "../img/svg/shipping.svg";
import invoiceImg from "../img/svg/invoice.svg";
import paymentImg from "../img/svg/payment.svg";
import supportImg from "../img/svg/support.svg";

const FeaturesGrid = () => {
  const classes = useStyles();
  return (
    <div className={classes.FeatureGrid}>
      <FeatureBox
        img={shippingImg}
        title="Free Shipping"
        description="We give free shipping to anywhere in the world"
      />
      <FeatureBox
        img={invoiceImg}
        title="Clear Invoices"
        description="With our clear and transparent invoices you will not miss anything"
      />
      <FeatureBox
        img={paymentImg}
        title="Easy Payments"
        description="We accept Visa, Mastercard, American Express and Paypal"
      />
      <FeatureBox
        img={supportImg}
        title="24/7 Support"
        description="Our dedicated support team will give you support anytime with any problem you will have"
      />
    </div>
  );
};

export default FeaturesGrid;
