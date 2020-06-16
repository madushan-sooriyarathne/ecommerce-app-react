import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import { saveOrder, updateCurrentUser } from "../utils/FirebaseUtils";

import {
  subTotalSelector,
  cartListItemsSelector,
} from "../redux/reducers/cart-list/CartListSelectors";
import { getCurrentUserId } from "../redux/reducers/user/UserSelectors";
import { clearCartList } from "../redux/reducers/cart-list/CartListActions";
import {
  showNotification,
  removeNotification,
} from "../redux/reducers/notification/NotifcationActions";

import ButtonStatic from "./buttons/ButtonStatic";
import HeadingPrimary from "./headings/HeadingPrimary";

import useStyles from "../styles/components/StripeCheckoutFormStyles";

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
            color: "var(--color-gray)",
          },
        },
        invalid: {
          color: "var(--color-error)",
        },
      },
    }),
    []
  );

  return options;
};

const StripeCheckoutForm = ({
  currentUserId,
  amount,
  shipping,
  discount,
  currentCartList,
  clearCartMenu,
  customerDetails,
  closeAndRedirect,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const [loading, setLoading] = useState(false);

  //Styles
  const classes = useStyles();

  // final amount
  const finalAmount =
    (amount + shipping.cost - amount * (discount / 100)).toFixed(2) * 100;

  const handleSubmit = async (event) => {
    let orderSaveStatus = {};

    const billing_details = {
      name: customerDetails.name,
      address_line1: customerDetails.billing_address.line1,
      address_line2: customerDetails.billing_address.line2,
      address_city: customerDetails.billing_address.city,
      address_zip: customerDetails.billing_address.postal_code,
      address_state: customerDetails.billing_address.state,
      address_country: customerDetails.billing_address.country,
    };

    // Preventing the form's default behavior
    event.preventDefault();
    setLoading(!loading);

    // if stripe or elements not loaded, disable the submit option
    if (!stripe || !elements) {
      return;
    }

    try {
      // create the token
      const { token } = await stripe.createToken(
        elements.getElement(CardCvcElement),
        billing_details
      );

      if (token.error) {
        showNotification({ message: "Error creating token", type: "error" });
        setTimeout(() => removeNotification(), 5000);
      } else {
        // TODO: move whole payment part to the backend.
        // Send the products and quantities to the back end process the payment amount in the back end
        // and make the payment using stripe. also save the order in database

        // sending data to the back-end to make the charge,
        // In back-end, we first check this customer already exists in the stripe db,
        // if so we use that customer with new card to make the payment
        // otherwise we create a new customer and make the payment
        const result = await fetch("http://localhost:5000/payment", {
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            amount: finalAmount,
            token,
            customerDetails,
          }),
        });

        const paymentData = await result.json();

        // If payment is succeeded, save the order data to database
        if (
          paymentData.amount === finalAmount &&
          paymentData.status === "succeeded"
        ) {
          const orderData = {
            products: currentCartList,
            userId: currentUserId,
            discount: discount,
            billing_address: paymentData.billing_details.address,
            order_state: 0,
            phone: paymentData.metadata.phone,
            orderNumber: paymentData.id,
            orderDate: new Date().toString(),
            shipDate: null,
            orderEmail: paymentData.receipt_email,
            receiptUrl: paymentData.receipt_url,
            shipping: shipping,
            carrier: {
              name: shipping.name,
              carrier_tracking_number: "000100203",
              url: `${shipping.url}000100203`,
            },
          };

          // update the stripe customer id of current user
          if (!customerDetails.stripeCustomerId) {
            try {
              await updateCurrentUser(currentUserId, {
                stripeCustomerId: paymentData.customer,
              });
            } catch (error) {
              showNotification({
                message: "Error updating current user's sripe ID",
                type: "warning",
              });
              setTimeout(() => removeNotification(), 5000);

              // console out the error
              console.error(
                `Error updating current user's stripe id : ${error.message}`
              );
            }
          }

          // Save the order in db
          orderSaveStatus = await saveOrder(orderData, paymentData.id);
        }

        if (orderSaveStatus.status) {
          clearCartMenu();
          closeAndRedirect(paymentData.id);
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      showNotification({
        message: error.messge,
        type: "error",
      });
      setTimeout(() => removeNotification(), 5000);
    }

    setLoading(false);
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
          Pay $ {finalAmount / 100}
        </ButtonStatic>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUserId: getCurrentUserId(state),
  amount: subTotalSelector(state),
  currentCartList: cartListItemsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  clearCartMenu: () => dispatch(clearCartList()),
  showNotification: (notification) => dispatch(showNotification(notification)),
  removeNotification: () => dispatch(removeNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StripeCheckoutForm);
