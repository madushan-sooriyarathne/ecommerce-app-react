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
  const [billingDetails, setBillingDetails] = useState({});

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
  const [country, updateCountry, resetCountry] = useInputState(
    currentUser.address.country || ""
  );
  const [
    addressLineOne,
    updateAddressLineOne,
    resetAddressLineOne,
  ] = useInputState(currentUser.address.addressLineOne || "");
  const [
    addressLineTwo,
    updateAddressLineTwo,
    resetAddressLineTwo,
  ] = useInputState(currentUser.address.addressLineTwo || "");
  const [city, updateCity, resetCity] = useInputState(
    currentUser.address.city || ""
  );
  const [postalCode, updatePostalCode, resetPostalCode] = useInputState(
    currentUser.address.postalCode || ""
  );

  const handleFormSubmit = () => {
    console.log(formRef);
    // formRef.current.submit();

    // TODO: check if form is validated
    if (true) {
      setBillingDetails({
        address: {
          city: city,
          country: country,
          line1: addressLineOne,
          line2: addressLineTwo,
          postal_code: postalCode,
          state: "",
        },
        email: email,
        name: fullName,
        phone: phoneNumber,
      });

      setPopupOpen(true);
    }

    // Clear the field
    resetFullName();
    resetPhoneNumber();
    resetEmail();
    resetCountry();
    resetAddressLineOne();
    resetAddressLineTwo();
    resetCity();
    resetPostalCode();
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
                id="CountryField"
                label="Country"
                type="LastName"
                isRequired={true}
                value={country}
                onChange={updateCountry}
              />
              <FormField
                id="AddressLineOneField"
                label="Address Line 1"
                type="text"
                isRequired={true}
                value={addressLineOne}
                onChange={updateAddressLineOne}
              />
              <FormField
                id="AddressLineTwoField"
                label="Address Line 2"
                type="text"
                isRequired={true}
                value={addressLineTwo}
                onChange={updateAddressLineTwo}
              />
              <FormField
                id="CityField"
                label="City"
                type="text"
                isRequired={true}
                value={city}
                onChange={updateCity}
              />
              <FormField
                id="PostalCodeField"
                label="Postal Code"
                type="LastName"
                isRequired={true}
                value={postalCode}
                onChange={updatePostalCode}
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
                type="LastName"
                isRequired={true}
              />
              <FormField
                id="ShippingAddressLineOneField"
                label="Address Line 1"
                type="text"
                isRequired={true}
              />
              <FormField
                id="ShippingAddressLineTwoField"
                label="Address Line 2"
                type="text"
                isRequired={true}
              />
              <FormField
                id="ShippingCityField"
                label="City"
                type="text"
                isRequired={true}
              />
              <FormField
                id="ShippingPostalCodeField"
                label="Postal Code"
                type="LastName"
                isRequired={true}
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
        billing_details={billingDetails}
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
