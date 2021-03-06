import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import firebase, {
  updateCurrentUser,
  firestore,
  auth,
  deleteUser,
  signupWithFacebook,
  signupWithGoogle,
} from "../utils/FirebaseUtils";

import { productListSelector } from "../redux/reducers/product-list/ProductListSelectors";
import { updateUser, setCurrentUser } from "../redux/reducers/user/UserActions";
import { favoriteProductListSelector } from "../redux/reducers/favorite-product-list/FavoriteProductListSelectors";
import {
  showNotification,
  removeNotification,
} from "../redux/reducers/notification/NotifcationActions";

import useListState from "../hooks/UseListState";
import useToggleState from "../hooks/UseToggleState";
import useInputState from "../hooks/UseInputState";

import TabButton from "../components/TabButton";
import FormField from "../components/FormField";
import ButtonStatic from "../components/buttons/ButtonStatic";
import HeadingSecondary from "../components/headings/HeadingSecondary";
import HeadingPrimarySlim from "../components/headings/HeadingPrimarySlim";
import ButtonAnimated from "../components/buttons/ButtonAnimated";
import CurrentUserBadge from "../components/CurrentUserBadge";
import ProductListItem from "../components/ProductListItem";
import OrderListItem from "../components/OrderListItem";
import AuthProviderBadge from "../components/AuthProviderBadge";
import FormContainer from "../components/FormContainer";
import AccountTabbedContainer from "../layouts/AccountTabbedContainer";
import Page from "./Page";

import useStyles from "../styles/pages/AccountStyles";

import empty from "../img/svg/empty.svg";
import Popup from "../layouts/Popup";
import HeadingPrimary from "../components/headings/HeadingPrimary";

const Account = ({
  currentUser,
  favoriteProductList,
  productList,
  updateCurrentUserLocal,
  removeCurrentUser,
  showNotification,
  removeNotification,
}) => {
  // history hook
  const history = useHistory();

  // State
  const [isDisabled, toggleIsDisabled] = useToggleState(true);
  const [loading, setLoading] = useState(false);
  const [popup, showPopup] = useState(false);
  const [orders, setOrders] = useState([]);

  const [accountContent, toggleAccountContentItem] = useListState([
    {
      id: 0,
      btnName: "Account Overview",
      isActive: true,
    },
    {
      id: 1,
      btnName: "Order History",
      isActive: false,
    },

    {
      id: 2,
      btnName: "WishList",
      isActive: false,
    },
  ]);

  // Input Field states
  const [displayName, updateDisplayName] = useInputState(
    currentUser ? currentUser.displayName : ""
  );
  const [phoneNumber, updatePhoneNumber] = useInputState(
    currentUser ? currentUser.phoneNumber : ""
  );

  const [country, updateCountry] = useInputState(
    currentUser ? currentUser.address.country : ""
  );

  const [addressLineOne, updateAddressLineOne] = useInputState(
    currentUser ? currentUser.address.addressLineOne : ""
  );

  const [addressLineTwo, updateAddressLineTwo] = useInputState(
    currentUser ? currentUser.address.addressLineTwo : ""
  );

  const [city, updateCity] = useInputState(
    currentUser ? currentUser.address.city : ""
  );

  const [postalCode, updatePostalCode] = useInputState(
    currentUser ? currentUser.address.postalCode : ""
  );

  const [popupEmail, updatePopupEmail, resetPopupEmail] = useInputState("");
  const [
    popupPassword,
    updatePopupPassword,
    resetPopupPassword,
  ] = useInputState("");

  // filter the products and get the favorite products
  let favoriteProducts = [];

  favoriteProductList.forEach((productId) => {
    for (let product of productList) {
      if (product.id === productId) {
        favoriteProducts.push(product);
        return;
      }
    }
  });

  const activeId = accountContent.filter((item) => item.isActive)[0].id;

  const classes = useStyles({
    activeItem: activeId,
  });

  // Event Handlers
  // Event handler for tab buttons
  const handleSelect = (event) => {
    const el = event.target.closest(".tab-btn");
    if (el) {
      const id = parseInt(el.dataset.id);
      toggleAccountContentItem(id);
    }
  };

  // Close Popup
  const closePopup = (event) => {
    showPopup(false);

    // show notification
    showNotification({
      message: "Process interrupted by user",
      type: "warning",
    });
    setTimeout(() => removeNotification(), 5000);
  };

  const handleUserNotification = (status) => {
    if (status.status === "error") {
      showNotification({
        message: "Error deleting the user",
        type: "error",
      });
      setTimeout(() => removeNotification(), 5000);
    } else {
      // remove current user
      removeCurrentUser();

      // redirect to login page
      history.push("/login");

      showNotification({
        message: "User deleted!",
        type: "success",
      });
      setTimeout(() => removeNotification(), 5000);
    }
  };

  // Handle popup form submit
  const handlePopupFormSubmit = async (event) => {
    event.preventDefault();

    if ((popupEmail !== "") & (popupPassword !== "")) {
      // create credential using email and password;
      const cred = firebase.auth.EmailAuthProvider.credential(
        popupEmail,
        popupPassword
      );

      // re-authenticate user with credentials created above
      try {
        await auth.currentUser.reauthenticateWithCredential(cred);

        const status = await deleteUser();

        // show notification to user
        handleUserNotification(status);
      } catch (error) {
        showNotification({
          message: error.message,
          type: "error",
        });
        setTimeout(() => removeNotification(), 5000);
        console.error(`Error authenticating the user : ${error.message}`);
      }
    }
  };

  // Submit Event handler for user info form submit
  const handleFormSubmit = async (event) => {
    // Start button loading animation
    setLoading(true);

    event.preventDefault();

    const data = {
      address: {
        country,
        addressLineOne,
        addressLineTwo,
        city,
        postalCode,
      },
      displayName,
      phoneNumber,
    };

    try {
      // update the user record in firebase
      await updateCurrentUser(currentUser.uid, data);

      // update the user record in local redux state
      // NOTE: Maybe there is a good way to do it. But at the moment this is the best i know.
      updateCurrentUserLocal(data);

      // show notification to user
      showNotification({
        message: "Account details updated successfully",
        type: "success",
      });
      setTimeout(() => removeNotification(), 5000);
    } catch (error) {
      showNotification({
        message: "Error updating Account details.",
        type: "error",
      });
      setTimeout(() => removeNotification(), 5000);

      // log errors to console
      console.error(error.message);
    }

    // Stop loading animation of the button
    setLoading(false);

    // Disable the form
    toggleIsDisabled();
  };

  // handler Delete User action
  const handleDeleteUser = async (event) => {
    // re-authenticate user

    // if auth provider is facebook or Google popup for re-authenticate process. else (means email and password)
    // show a popup model for user to enter email and password.
    if (currentUser.providerId === "facebook.com") {
      try {
        await signupWithFacebook();

        const status = await deleteUser();

        handleUserNotification(status);
      } catch (error) {
        showNotification({
          message: "Process interrupted by user",
          type: "warning",
        });
        setTimeout(() => removeNotification(), 5000);

        console.error("Error signing in with Facebook " + error);
      }
    } else if (currentUser.providerId === "google.com") {
      try {
        await signupWithGoogle();

        const status = await deleteUser();

        handleUserNotification(status);
      } catch (error) {
        // show warning message to user
        showNotification({
          message: "Process interrupted by user",
          type: "warning",
        });
        setTimeout(() => removeNotification(), 5000);

        console.error("Error signing in with Google " + error);
      }
    } else {
      // this is email and password sign-in
      // show the popup to the user
      showPopup(true);
    }
  };

  // getting the current user data
  useEffect(() => {
    const getOrderData = async () => {
      const orderCollectionRef = firestore
        .collection("orders")
        .where("userId", "==", currentUser.uid);
      try {
        const orderCollectionSnap = await orderCollectionRef.get();
        setOrders(orderCollectionSnap.docs.map((doc) => doc.data()));
      } catch (error) {
        showNotification({
          message: "Error getting user's orders",
          type: "error",
        });
        setTimeout(() => removeNotification(), 5000);
        console.error("Error fetching orders");
      }
    };

    getOrderData();
  }, [currentUser.uid, showNotification, removeNotification]);

  return (
    <Page>
      <div className={classes.Account}>
        <div className={classes.Account_navigation}>
          <CurrentUserBadge currentUser={currentUser} />
          <div className={classes.Account_NavButtons}>
            {accountContent.map((item) => (
              <TabButton
                key={item.id}
                id={item.id}
                isActive={item.isActive}
                onClick={handleSelect}
              >
                {item.btnName}
              </TabButton>
            ))}
          </div>
        </div>
        <div className={classes.Account_details}>
          {/* Account Overview */}
          <AccountTabbedContainer
            title="Account Overview"
            id={classes.Account_details_overview}
            buttons={[
              <ButtonStatic
                primaryColor="var(--color-error)"
                secondaryColor="var(--color-white)"
                isSmall={true}
                onClick={handleDeleteUser}
                styles={{
                  padding: "1rem",
                  fontSize: "1.2rem",
                  fontWeight: "500",
                }}
              >
                Delete Account
              </ButtonStatic>,
            ]}
          >
            <div className={classes.content_wrapper}>
              <HeadingSecondary>User Authentication Details</HeadingSecondary>
              {currentUser && currentUser.providerId === "password" ? (
                <>
                  <div className={classes.button_input_field}>
                    <FormField
                      id="EmailField"
                      label="Email"
                      type="email"
                      value={currentUser ? currentUser.email : ""}
                      isRequired={true}
                      isDisabled={true}
                    />
                    <Link to="/updateEmail">
                      <ButtonAnimated
                        primaryColor="var(--color-danger)"
                        secondaryColor="var(--color-white)"
                        isSmall={true}
                      >
                        Update Emial
                      </ButtonAnimated>
                    </Link>
                  </div>
                  <div className={classes.button_input_field}>
                    <FormField
                      id="PasswordField"
                      label="Password"
                      type="password"
                      value="*****"
                      isRequired={true}
                      isDisabled={true}
                    />
                    <Link to="/updatePassword">
                      <ButtonAnimated
                        primaryColor="var(--color-danger)"
                        secondaryColor="var(--color-white)"
                        isSmall={true}
                      >
                        Update Password
                      </ButtonAnimated>
                    </Link>
                  </div>
                </>
              ) : (
                <AuthProviderBadge providerId={currentUser.providerId} />
              )}
            </div>
            <div className={classes.content_wrapper}>
              <div className={classes.inline_button_heading}>
                <HeadingSecondary>General Details</HeadingSecondary>
                <ButtonAnimated
                  primaryColor="var(--color-primary)"
                  secondaryColor="var(--color-white)"
                  isSmall={true}
                  onClick={toggleIsDisabled}
                  styles={{
                    padding: "0.5rem",
                    fontSize: "1.2rem",
                    fontWeight: "500",
                    marginLeft: "1rem",
                  }}
                >
                  {isDisabled ? "edit" : "cancel"}
                </ButtonAnimated>
              </div>

              <form
                className={classes.Overview_form}
                onSubmit={handleFormSubmit}
              >
                <FormField
                  id="NameField"
                  label="Name"
                  type="text"
                  isRequired={true}
                  value={displayName}
                  onChange={updateDisplayName}
                  isDisabled={isDisabled}
                />

                <FormField
                  id="PhoneNumberField"
                  label="Phone Number"
                  type="tel"
                  value={phoneNumber}
                  onChange={updatePhoneNumber}
                  isRequired={true}
                  isDisabled={isDisabled}
                />

                <FormField
                  id="CountryField"
                  label="Country"
                  type="text"
                  value={country}
                  onChange={updateCountry}
                  isRequired={true}
                  isDisabled={isDisabled}
                />
                <FormField
                  id="AddressLineOneField"
                  label="Address Line 1"
                  type="text"
                  value={addressLineOne}
                  onChange={updateAddressLineOne}
                  isRequired={true}
                  isDisabled={isDisabled}
                />
                <FormField
                  id="AddressLineTwoField"
                  label="Address Line 2"
                  type="text"
                  isRequired={false}
                  value={addressLineTwo}
                  onChange={updateAddressLineTwo}
                  isDisabled={isDisabled}
                />
                <FormField
                  id="CityField"
                  label="City"
                  type="text"
                  value={city}
                  onChange={updateCity}
                  isRequired={true}
                  isDisabled={isDisabled}
                />
                <FormField
                  id="PostalCodeField"
                  label="Postal Code"
                  type="text"
                  value={postalCode}
                  onChange={updatePostalCode}
                  isRequired={true}
                  isDisabled={isDisabled}
                />
                {!isDisabled && (
                  <ButtonStatic
                    primaryColor="var(--color-primary)"
                    secondaryColor="var(--color-white)"
                    type="submit"
                    isSmall={false}
                    styles={{ marginTop: "1rem", alignSelf: "stretch  " }}
                    loading={loading}
                  >
                    Update Account Details
                  </ButtonStatic>
                )}
              </form>
            </div>
          </AccountTabbedContainer>

          {/* Favorite Products / Wishlist */}
          <AccountTabbedContainer
            id={classes.Account_details_wishlist}
            title="Wish List"
          >
            <div className={classes.Wishlist}>
              {favoriteProducts.length < 1 ? (
                <div className={classes.Empty_container}>
                  <img
                    className={classes.Empty_image}
                    src={empty}
                    alt="Wishlist Empty"
                  ></img>
                  <HeadingPrimarySlim styles={{ color: "var(--color-error)" }}>
                    You don't have any favorite products.
                  </HeadingPrimarySlim>
                </div>
              ) : (
                favoriteProducts.map((favProduct) => (
                  <ProductListItem product={favProduct} key={favProduct.id} />
                ))
              )}
            </div>
          </AccountTabbedContainer>

          {/* Order History */}
          <AccountTabbedContainer
            id={classes.Account_details_orderHistory}
            title="Order History"
          >
            <div className={classes.Order_History}>
              {orders.length < 1 ? (
                <div className={classes.Empty_container}>
                  <img
                    className={classes.Empty_image}
                    src={empty}
                    alt="Wishlist Empty"
                  ></img>
                  <HeadingPrimarySlim styles={{ color: "var(--color-error)" }}>
                    You haven't made any orders yet.
                  </HeadingPrimarySlim>
                </div>
              ) : (
                orders.map((order) => {
                  const amount = order.products.reduce(
                    (acc, cur) => acc + cur.price * cur.qtc,
                    0
                  );

                  return (
                    <OrderListItem
                      orderId={order.orderNumber}
                      amount={
                        amount +
                        order.shipping.cost -
                        amount * (order.discount / 100)
                      }
                      receiptUrl={order.receiptUrl}
                    />
                  );
                })
              )}
            </div>
          </AccountTabbedContainer>
        </div>
      </div>

      {/* Popup for user delete function */}
      <Popup showPopup={popup} handlePopupClose={closePopup}>
        <FormContainer handleSubmit={handlePopupFormSubmit}>
          <HeadingPrimary
            styles={{ marginBottom: "4rem", textAlign: "center" }}
          >
            Please Re-Authenticate yourself
          </HeadingPrimary>
          <FormField
            id="PopupEmailField"
            label="Email"
            type="email"
            value={popupEmail}
            onChange={updatePopupEmail}
            isRequired={true}
          />
          <FormField
            id="popupPasswordField"
            label="Password"
            type="password"
            value={popupPassword}
            onChange={updatePopupPassword}
            isRequired={true}
          />
          <ButtonStatic
            primaryColor="var(--color-primary)"
            secondaryColor="var(--color-white)"
            type="submit"
            isSmall={true}
            styles={{ marginTop: "1rem", alignSelf: "stretch  " }}
          >
            Delete My Account
          </ButtonStatic>
        </FormContainer>
      </Popup>
    </Page>
  );
};

//Redux Mappings
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  productList: productListSelector(state),
  favoriteProductList: favoriteProductListSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrentUserLocal: (updatedFields) =>
    dispatch(updateUser(updatedFields)),
  removeCurrentUser: () => dispatch(setCurrentUser(null)),
  showNotification: (notification) => dispatch(showNotification(notification)),
  removeNotification: () => dispatch(removeNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
