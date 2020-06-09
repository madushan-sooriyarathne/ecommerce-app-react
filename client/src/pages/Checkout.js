import React, { useState, useRef } from "react";
import { connect } from "react-redux";

import useInputState from "../hooks/UseInputState";

import FormField from "../components/FormField";
import ButtonAnimated from "../components/buttons/ButtonAnimated";
import HeadingPrimary from "../components/headings/HeadingPrimary";
import HeadingSecondary from "../components/headings/HeadingSecondary";

import useStyles from "../styles/pages/CheckoutStyles";

import { subTotalSelector } from "../redux/reducers/cart-list/CartListSelectors";
import StripePaymentPopup from "../components/StripePaymentPopup";
import ButtonStatic from "../components/buttons/ButtonStatic";

const Checkout = ({ subTotal, currentUser }) => {
  const classes = useStyles();

  // form ref
  const formRef = useRef();

  //State
  const [shipping, setShipping] = useState(10);
  const [discount, setDiscount] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({});

  const total = (subTotal + shipping - subTotal * (discount / 100)).toFixed(2);

  //Form field states
  const [fullName, updateFullName, resetFullName] = useInputState(
    currentUser.displayName || ""
  );
  const [phoneNumber, updatePhoneNumber, resetPhoneNumber] = useInputState(
    currentUser.phoneNumber || ""
  );
  const [email, updateEmail, resetEmail] = useInputState(
    currentUser.email || ""
  );

  // Billing address form status
  const [
    billingCountry,
    updateBillingCountry,
    resetBillingCountry,
  ] = useInputState(currentUser.address.country || "");
  const [
    billingAddressLineOne,
    updateBillingAddressLineOne,
    resetBillingAddressLineOne,
  ] = useInputState(currentUser.address.addressLineOne || "");
  const [
    billingAddressLineTwo,
    updateBillingAddressLineTwo,
    resetBillingAddressLineTwo,
  ] = useInputState(currentUser.address.addressLineTwo || "");
  const [billingCity, updateBillingCity, resetBillingCity] = useInputState(
    currentUser.address.city || ""
  );
  const [
    billingPostalCode,
    updateBillingPostalCode,
    resetBillingPostalCode,
  ] = useInputState(currentUser.address.postalCode || "");

  // Shipping address form state
  const [
    shippingCountry,
    updateShippingCountry,
    resetShippingCountry,
  ] = useInputState(currentUser.address.country || "");
  const [
    shippingAddressLineOne,
    updateShippingAddressLineOne,
    resetShippingAddressLineOne,
  ] = useInputState(currentUser.address.addressLineOne || "");
  const [
    shippingAddressLineTwo,
    updateShippingAddressLineTwo,
    resetShippingAddressLineTwo,
  ] = useInputState(currentUser.address.addressLineTwo || "");
  const [shippingCity, updateShippingCity, resetShippingCity] = useInputState(
    currentUser.address.city || ""
  );
  const [
    shippingPostalCode,
    updateShippingPostalCode,
    resetShippingPostalCode,
  ] = useInputState(currentUser.address.postalCode || "");

  const handleFormSubmit = () => {
    console.log(formRef);
    // formRef.current.submit();

    // TODO: check if form is validated
    if (true) {
      setCustomerDetails({
        email: email,
        name: fullName,
        phone: phoneNumber,
        stripeCustomerId: currentUser.stripeCustomerId,
        billing_address: {
          city: billingCity,
          country: billingCountry,
          line1: billingAddressLineOne,
          line2: billingAddressLineTwo,
          postal_code: billingPostalCode,
          state: "",
        },
        shipping_address: {
          city: shippingCity,
          country: shippingCountry,
          line1: shippingAddressLineOne,
          line2: shippingAddressLineTwo,
          postal_code: shippingPostalCode,
          state: "",
        },
      });

      setPopupOpen(true);
    }

    // Clear the field
    resetFullName();
    resetPhoneNumber();
    resetEmail();
    resetBillingCountry();
    resetBillingAddressLineOne();
    resetBillingAddressLineTwo();
    resetBillingCity();
    resetBillingPostalCode();
    resetShippingCountry();
    resetShippingAddressLineOne();
    resetShippingAddressLineTwo();
    resetShippingCity();
    resetShippingPostalCode();
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  return (
    <div className={classes.Checkout}>
      <HeadingPrimary styles={{ marginBottom: "4rem" }}>
        Checkout
      </HeadingPrimary>
      <div className={classes.Checkout_container}>
        <div className={classes.Checkout_form}>
          <div className={classes.Checkout_form_section}>
            <HeadingSecondary styles={{ marginBottom: "1rem" }}>
              Billing Details
            </HeadingSecondary>
            <form ref={formRef}>
              <FormField
                id="NameField"
                label="Full Name"
                type="text"
                isRequired={true}
                value={fullName}
                onChange={updateFullName}
              />
              <div className={classes.Form_wrapper}>
                <FormField
                  id="PhoneNumberField"
                  label="Phone Number"
                  type="tel"
                  isRequired={true}
                  value={phoneNumber}
                  onChange={updatePhoneNumber}
                />
                <FormField
                  id="EmailField"
                  label="Email"
                  type="email"
                  isRequired={true}
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <FormField
                id="BillingCountryField"
                label="Country"
                type="text"
                isRequired={true}
                value={billingCountry}
                onChange={updateBillingCountry}
              />
              <FormField
                id="BillingAddressLineOneField"
                label="Address Line 1"
                type="text"
                isRequired={true}
                value={billingAddressLineOne}
                onChange={updateBillingAddressLineOne}
              />
              <FormField
                id="BillingAddressLineTwoField"
                label="Address Line 2"
                type="text"
                isRequired={true}
                value={billingAddressLineTwo}
                onChange={updateBillingAddressLineTwo}
              />
              <FormField
                id="BillingCityField"
                label="City"
                type="text"
                isRequired={true}
                value={billingCity}
                onChange={updateBillingCity}
              />
              <FormField
                id="BillingPostalCodeField"
                label="Postal Code"
                type="LastName"
                isRequired={true}
                value={billingPostalCode}
                onChange={updateBillingPostalCode}
              />
            </form>
          </div>
          <div className={classes.Checkout_form_section}>
            <HeadingSecondary styles={{ marginBottom: "1rem" }}>
              Shipping Details
            </HeadingSecondary>
            <form>
              <FormField
                id="ShippingCountryField"
                label="Country"
                type="text"
                isRequired={true}
                value={shippingCountry}
                onChange={updateShippingCountry}
              />
              <FormField
                id="ShippingAddressLineOneField"
                label="Address Line 1"
                type="text"
                isRequired={true}
                value={shippingAddressLineOne}
                onChange={updateShippingAddressLineOne}
              />
              <FormField
                id="ShippingAddressLineTwoField"
                label="Address Line 2"
                type="text"
                isRequired={true}
                value={shippingAddressLineTwo}
                onChange={updateShippingAddressLineTwo}
              />
              <FormField
                id="ShippingCityField"
                label="City"
                type="text"
                isRequired={true}
                value={shippingCity}
                onChange={updateShippingCity}
              />
              <FormField
                id="ShippingPostalCodeField"
                label="Postal Code"
                type="LastName"
                isRequired={true}
                value={shippingPostalCode}
                onChange={updateShippingPostalCode}
              />
            </form>
          </div>
        </div>
        <div className={classes.Checkout_summery}>
          <table className={classes.Summery_table}>
            <tr className={classes.Summery_table_const}>
              <th className={classes.row_heading}>Sub Total</th>
              <th className={classes.row_amount}>{`$ ${subTotal.toFixed(
                2
              )}`}</th>
            </tr>
            <tr className={classes.Summery_table_const}>
              <th className={classes.row_heading}>Discount</th>
              <th className={classes.row_amount}>{`${discount} %`}</th>
            </tr>

            <tr className={classes.Summery_table_const}>
              <th className={classes.row_heading}>Shipping</th>
              <th className={classes.row_amount}>{`$ ${shipping.toFixed(
                2
              )}`}</th>
            </tr>

            <tr className={classes.Summery_table_const}>
              <th className={classes.row_heading}>Total</th>
              <th className={classes.row_amount} style={{ fontWeight: 500 }}>
                {`$ ${total}`}
              </th>
            </tr>
          </table>
          <form className={classes.Summery_couponForm}>
            <FormField
              id="couponCode"
              label="Coupon Code"
              isRequired={true}
              withLabel={false}
            />
            <ButtonAnimated
              primaryColor="var(--color-primary)"
              secondaryColor="var(--color-white)"
              type="submit"
              isSmall={true}
            >
              Apply
            </ButtonAnimated>
          </form>
          <ButtonStatic
            primaryColor="var(--color-primary)"
            isSmall={true}
            styles={{ width: "100%" }}
            onClick={handleFormSubmit}
          >
            Pay $ {total}
          </ButtonStatic>
        </div>
      </div>
      <StripePaymentPopup
        amount={total}
        customerDetails={customerDetails}
        popupOpen={popupOpen}
        closePopup={closePopup}
      />
    </div>
  );
};

// Redux Bindings
const mapStateToProps = (state) => ({
  subTotal: subTotalSelector(state),
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, null)(Checkout);
