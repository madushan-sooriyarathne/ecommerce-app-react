import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import useListState from "../hooks/UseListState";
import useToggleState from "../hooks/UseToggleState";
import userInputState from "../hooks/UseInputState";

import TabButton from "../components/TabButton";
import FormField from "../components/FormField";
import ButtonStatic from "../components/buttons/ButtonStatic";
import HeadingSecondary from "../components/headings/HeadingSecondary";
import ButtonAnimated from "../components/buttons/ButtonAnimated";
import CurrentUserBadge from "../components/CurrentUserBadge";

import AccountTabbedContainer from "../layouts/AccountTabbedContainer";
import CenteredPage from "./CenteredPage";

import useStyles from "../styles/pages/AccountStyles";

const Account = ({ currentUser }) => {
  // State
  const [isDisabled, toggleIsDisabled] = useToggleState(true);
  const [name, updateName, resetName] = userInputState(
    currentUser ? currentUser.displayName : ""
  );
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

  // set default active pane according to the URL query parameter
  // toggleAccountContentItem(pane && pane < 3 ? pane : 0);

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
    <CenteredPage>
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
                  isRequired={true}
                  isDisabled={isDisabled}
                />

                <FormField
                  id="CountryField"
                  label="Country"
                  type="LastName"
                  isRequired={true}
                  isDisabled={isDisabled}
                />
                <FormField
                  id="AddressLineOneField"
                  label="Address Line 1"
                  type="text"
                  isRequired={true}
                  isDisabled={isDisabled}
                />
                <FormField
                  id="AddressLineTwoField"
                  label="Address Line 2"
                  type="text"
                  isRequired={true}
                  isDisabled={isDisabled}
                />
                <FormField
                  id="CityField"
                  label="City"
                  type="text"
                  isRequired={true}
                  isDisabled={isDisabled}
                />
                <FormField
                  id="PostalCodeField"
                  label="Postal Code"
                  type="LastName"
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
          ></AccountTabbedContainer>
          <AccountTabbedContainer
            id={classes.Account_details_orderHistory}
            title="Order History"
          ></AccountTabbedContainer>
        </div>
      </div>
    </CenteredPage>
  );
};

//Redux Mappings
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, null)(Account);
