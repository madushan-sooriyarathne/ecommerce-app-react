import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { productListSelector } from "../redux/reducers/product-list/ProductListSelectors";

import useListState from "../hooks/UseListState";
import useToggleState from "../hooks/UseToggleState";
import useInputState from "../hooks/UseInputState";

import TabButton from "../components/TabButton";
import FormField from "../components/FormField";
import ButtonStatic from "../components/buttons/ButtonStatic";
import HeadingSecondary from "../components/headings/HeadingSecondary";
import ButtonAnimated from "../components/buttons/ButtonAnimated";
import CurrentUserBadge from "../components/CurrentUserBadge";
import ProductListItem from "../components/ProductListItem";

import AccountTabbedContainer from "../layouts/AccountTabbedContainer";
import Page from "./Page";

import useStyles from "../styles/pages/AccountStyles";
import { favoriteProductListSelector } from "../redux/reducers/favorite-product-list/FavoriteProductListSelectors";

const Account = ({ currentUser, favoriteProductList, productList }) => {
  // State
  const [isDisabled, toggleIsDisabled] = useToggleState(true);

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
  const [name, updateName, resetName] = useInputState(
    currentUser ? currentUser.displayName : ""
  );
  const [phone, updatePhone, resetPhone] = useInputState(
    currentUser ? currentUser.phone : ""
  );

  const [country, updateCountry, resetCountry] = useInputState(
    currentUser ? currentUser.address.country : ""
  );

  const [
    addressLineOne,
    updateAddressLineOne,
    resetAddressLineOne,
  ] = useInputState(currentUser ? currentUser.address.addressLineOne : "");

  const [
    addressLineTwo,
    updateAddressLineTwo,
    resetAddressLineTwo,
  ] = useInputState(currentUser ? currentUser.address.addressLineTwo : "");

  const [city, updateCity, resetCity] = useInputState(
    currentUser ? currentUser.address.city : ""
  );

  const [postalCode, updatePostalCode, resetPostalCode] = useInputState(
    currentUser ? currentUser.address.postalCode : ""
  );

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

  const handleSelect = (event) => {
    const el = event.target.closest(".tab-btn");
    if (el) {
      const id = parseInt(el.dataset.id);
      toggleAccountContentItem(id);
    }
  };

  return (
    <Page>
      <div className={classes.Account}>
        <div className={classes.Account_navigation}>
          <CurrentUserBadge
            username={currentUser.displayName.split(" ")[0]}
            displayImage={currentUser.photoURL}
          />
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
          <AccountTabbedContainer
            title="Account Overview"
            id={classes.Account_details_overview}
            buttons={[
              <ButtonStatic
                primaryColor="#b73326"
                secondaryColor="var(--color-white)"
                isSmall={true}
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
                <div>Signed in via {currentUser.providerId}</div>
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

              <form className={classes.Overview_form}>
                <FormField
                  id="FirstNameField"
                  label="First Name"
                  type="text"
                  isRequired={true}
                  value={name}
                  onChange={updateName}
                  isDisabled={isDisabled}
                />

                <FormField
                  id="PhoneNumberField"
                  label="Phone Number"
                  type="tel"
                  value={phone}
                  onChange={updatePhone}
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
                  type="LastName"
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
                    isSmall={true}
                    styles={{ marginTop: "1rem", alignSelf: "stretch  " }}
                  >
                    Update Account Details
                  </ButtonStatic>
                )}
              </form>
            </div>
          </AccountTabbedContainer>
          <AccountTabbedContainer
            id={classes.Account_details_wishlist}
            title="Wish List"
          >
            <div className={classes.Wishlist}>
              {favoriteProducts.map((favProduct) => (
                <ProductListItem product={favProduct} key={favProduct.id} />
              ))}
            </div>
          </AccountTabbedContainer>
          <AccountTabbedContainer
            id={classes.Account_details_orderHistory}
            title="Order History"
          ></AccountTabbedContainer>
        </div>
      </div>
    </Page>
  );
};

//Redux Mappings
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  productList: productListSelector(state),
  favoriteProductList: favoriteProductListSelector(state),
});

export default connect(mapStateToProps, null)(Account);
