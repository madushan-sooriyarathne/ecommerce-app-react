import React, { useMemo, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import useStyles from "../styles/components/StripeCheckoutFormStyles";
import ButtonStatic from "./buttons/ButtonStatic";
import HeadingPrimary from "./headings/HeadingPrimary";

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize: "1.5rem",
          color: "var(--color-primary)",
          backgroundColor: "var(--color-white)",
          letterSpacing: "0.025em",
          fontFamily: "var(--font-family-primary)",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    []
  );

  return options;
};

const StripeCheckoutForm = ({ amount, billing_details, closeAndRedirect }) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const [loading, setLoading] = useState(false);

  //Styles
  const classes = useStyles();

  const handleSubmit = async (event) => {
    // Preventing the form's default behavior
    event.preventDefault();
    setLoading(!loading);
    if (!stripe || !elements) {
      // if stripe or elements not loaded, disable the submit option
      return;
    }

    try {
      const { token } = await stripe.createToken(
        elements.getElement(CardCvcElement),
        {
          name: billing_details.name,
          address_line1: billing_details.address.line1,
          address_line2: billing_details.address.line2,
          address_city: billing_details.address.city,
          address_zip: billing_details.address.postal_code,
          address_state: billing_details.address.state,
          address_country: billing_details.address.country,
        }
      );

      if (token.error) {
        console.log("Error creating token");
      } else {
        const result = await fetch("http://localhost:5000/payment", {
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ token, amount }),
        });
        console.log(result);
        setLoading(false);
        closeAndRedirect("success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.StripeCheckoutForm}>
      <div className={classes.StripeCheckoutForm_heading}>
        <HeadingPrimary>Pay with your card</HeadingPrimary>
      </div>
      <form onSubmit={handleSubmit} className={classes.StripeCheckoutForm_form}>
        <div className={classes.StripeCheckoutForm_formGroup}>
          <label>Card Number</label>
          <CardNumberElement options={options} />
        </div>
        <div className={classes.StripeCheckoutForm_formGroup}>
          <label>Expiration date</label>
          <CardExpiryElement options={options} />
        </div>
        <div className={classes.StripeCheckoutForm_formGroup}>
          <label>CVC</label>
          <CardCvcElement options={options} />
        </div>
        <ButtonStatic type="submit" disabled={!stripe} loading={loading}>
          Pay $ {amount}
        </ButtonStatic>
      </form>
    </div>
  );
};

export default StripeCheckoutForm;
