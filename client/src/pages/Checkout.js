import React, { useState, useRef } from "react";
import { connect } from "react-redux";

import useInputState from "../hooks/UseInputState";
import useListState from "../hooks/UseListState";
import {
  showNotification,
  removeNotification,
} from "../redux/reducers/notification/NotifcationActions";

import FormField from "../components/FormField";
import ButtonAnimated from "../components/buttons/ButtonAnimated";
import HeadingPrimary from "../components/headings/HeadingPrimary";
import HeadingSecondary from "../components/headings/HeadingSecondary";

import useStyles from "../styles/pages/CheckoutStyles";

import { subTotalSelector } from "../redux/reducers/cart-list/CartListSelectors";
import StripePaymentPopup from "../components/StripePaymentPopup";
import ButtonStatic from "../components/buttons/ButtonStatic";
import { firestore } from "../utils/FirebaseUtils";

const Checkout = ({
  subTotal,
  currentUser,
  showNotification,
  removeNotification,
}) => {
  const classes = useStyles();

  // form ref
  const billingFormRef = useRef();
  const shippingFormRef = useRef();

  //State
  const [discount, setDiscount] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({});
  const [shippingPartners, toggleShippingPartners] = useListState([
    {
      name: "FedEx",
      id: "fedex",
      logo: "https://www.fedex.com/content/dam/fedex-com/logos/logo.png",
      url:
        "https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber=",
      cost: 10,
      isActive: true,
    },
    {
      name: "DHL",
      id: "dhl",
      logo: "https://www.dhl.com/img/meta/dhl_logo.gif",
      cost: 20,
      url: "https://www.dhl.com/en/express/tracking.html?AWB=",
      isActive: false,
    },
  ]);

  //Form field states
  const [fullName, updateFullName] = useInputState(
    currentUser.displayName || ""
  );
  const [phoneNumber, updatePhoneNumber] = useInputState(
    currentUser.phoneNumber || ""
  );
  const [email, updateEmail] = useInputState(currentUser.email || "");

  // Billing address form status
  const [billingCountry, updateBillingCountry] = useInputState(
    currentUser.address.country || ""
  );
  const [billingAddressLineOne, updateBillingAddressLineOne] = useInputState(
    currentUser.address.addressLineOne || ""
  );
  const [billingAddressLineTwo, updateBillingAddressLineTwo] = useInputState(
    currentUser.address.addressLineTwo || ""
  );
  const [billingCity, updateBillingCity] = useInputState(
    currentUser.address.city || ""
  );
  const [billingPostalCode, updateBillingPostalCode] = useInputState(
    currentUser.address.postalCode || ""
  );

  // Shipping address form state
  const [shippingCountry, updateShippingCountry] = useInputState(
    currentUser.address.country || ""
  );
  const [shippingAddressLineOne, updateShippingAddressLineOne] = useInputState(
    currentUser.address.addressLineOne || ""
  );
  const [shippingAddressLineTwo, updateShippingAddressLineTwo] = useInputState(
    currentUser.address.addressLineTwo || ""
  );
  const [shippingCity, updateShippingCity] = useInputState(
    currentUser.address.city || ""
  );
  const [shippingPostalCode, updateShippingPostalCode] = useInputState(
    currentUser.address.postalCode || ""
  );

  // Coupon code field status
  const [couponCode, updateCouponCode] = useInputState("");

  // function to run when form submit event triggered. and prevent the form's default behavior.
  const validateForm = (event) => {
    event.preventDefault();
  };

  // handle checkout button click event
  const handleFormSubmit = () => {
    // trigger submit event on both forms. this will run default form validations and mark if any field not validated.
    billingFormRef.current.dispatchEvent(new Event("submit"));
    shippingFormRef.current.dispatchEvent(new Event("submit"));

    // check if both forms are validated. only proceed if validated.
    if (
      billingFormRef.current.reportValidity() &&
      shippingFormRef.current.reportValidity()
    ) {
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
    } else {
      showNotification({
        message: "Please fill all the fields correctly",
        type: "error",
      });
      setTimeout(() => removeNotification(), 5000);
    }
  };

  // Handle shipping partner select
  const handleShippingSelect = (event) => {
    const el = event.target.closest(".shipping-partner");
    if (el) {
      toggleShippingPartners(el.dataset.id);
    }
  };

  // close the credit card popup
  const closePopup = () => {
    setPopupOpen(false);
  };

  // handle coupon code apply event
  const applyCoupon = async (event) => {
    // stop default form behavior
    event.preventDefault();

    if (couponCode === "") return;

    // get the discount percentage from firebase
    const couponCollectionRef = firestore.collection("coupons");

    try {
      const couponCollectionQuery = couponCollectionRef.where(
        "couponCode",
        "==",
        couponCode.toLowerCase()
      );

      const couponCollectionSnap = await couponCollectionQuery.get();

      const coupon = couponCollectionSnap.docs[0].data();

      if (coupon) {
        setDiscount(coupon.discount);
        showNotification({ message: "Coupon code applied", type: "success" });
        setTimeout(() => removeNotification(), 5000);
      } else {
        setDiscount(0);
      }
    } catch (error) {
      showNotification({
        message: "Error getting coupon code from the server",
        type: "error",
      });
      setTimeout(() => removeNotification(), 5000);

      // show the error in console
      console.error(
        `Error getting the coupon code data from the server : ${error.message}`
      );
    }
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
            <form ref={billingFormRef} onSubmit={validateForm}>
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
            <form ref={shippingFormRef} onSubmit={validateForm}>
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
              <th className={classes.row_amount}>{`$ ${shippingPartners
                .filter((item) => item.isActive)[0]
                .cost.toFixed(2)}`}</th>
            </tr>

            <tr className={classes.Summery_table_const}>
              <th className={classes.row_heading}>Total</th>
              <th className={classes.row_amount} style={{ fontWeight: 500 }}>
                {`$ ${(
                  subTotal +
                  shippingPartners.filter((item) => item.isActive)[0].cost -
                  subTotal * (discount / 100)
                ).toFixed(2)}`}
              </th>
            </tr>
          </table>
          <form className={classes.Summery_couponForm} onSubmit={applyCoupon}>
            <FormField
              id="couponCode"
              label="Coupon Code"
              isRequired={true}
              withLabel={false}
              value={couponCode}
              onChange={updateCouponCode}
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

          <div className={classes.Summery_shipping}>
            <p className={classes.Shipping_title}>
              Select a available shipping method
            </p>
            <div className={classes.Shipping_badge_array}>
              {shippingPartners.map((partner) => (
                <div
                  className={`shipping-partner ${classes.Shipping_badge} ${
                    partner.isActive && classes.Shipping_badge_active
                  }`}
                  data-id={partner.id}
                  onClick={handleShippingSelect}
                >
                  <img
                    className={classes.Badge_img}
                    src={partner.logo}
                    alt={partner.name}
                  ></img>
                  <p className={classes.Badge_amount}>$ {partner.cost}</p>
                </div>
              ))}
            </div>
          </div>

          <ButtonStatic
            primaryColor="var(--color-primary)"
            isSmall={true}
            styles={{ width: "100%" }}
            onClick={handleFormSubmit}
          >
            Pay ${" "}
            {(
              subTotal +
              shippingPartners.filter((item) => item.isActive)[0].cost -
              subTotal * (discount / 100)
            ).toFixed(2)}
          </ButtonStatic>
        </div>
      </div>
      <StripePaymentPopup
        discount={discount}
        shipping={shippingPartners.filter((item) => item.isActive)[0]}
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

const mapDispatchToProps = (dispatch) => ({
  showNotification: (notification) => dispatch(showNotification(notification)),
  removeNotification: () => dispatch(removeNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
