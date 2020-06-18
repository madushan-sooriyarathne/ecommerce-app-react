import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import firebase, { auth } from "../utils/FirebaseUtils";

import {
  showNotification,
  removeNotification,
} from "../redux/reducers/notification/NotifcationActions";

import CenteredPage from "./CenteredPage";

import Container from "../components/Container";
import FormField from "../components/FormField";
import ButtonStatic from "../components/buttons/ButtonStatic";
import useInputState from "../hooks/UseInputState";
import FormContainer from "../components/FormContainer";
import HeadingPrimary from "../components/headings/HeadingPrimary";
import HeadingPrimarySlim from "../components/headings/HeadingPrimarySlim";

const UpdatePassword = ({ showNotification, removeNotification }) => {
  // history hook
  const history = useHistory();

  // form state hooks
  const [
    currentPassword,
    setCurrentPassword,
    resetCurrentPassword,
  ] = useInputState("");
  const [newPassword, setNewPassword, resetNewPassword] = useInputState("");
  const [
    confirmPassword,
    setConfirmPassword,
    resetConfirmPassword,
  ] = useInputState("");

  // other state
  const [loading, setLoading] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  // handle from submit event
  const handleSubmit = async (event) => {
    event.preventDefault();

    // set loading
    setLoading(true);

    const currentUser = auth.currentUser;

    // create credentials using current user's email and current password
    const credentials = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );

    // re-authenticate user using credentials created above
    try {
      await currentUser.reauthenticateWithCredential(credentials);

      // update the password.
      if (newPassword === confirmPassword) {
        try {
          await currentUser.updatePassword(newPassword);

          // show a notification popup to user
          showNotification({
            message: "Password updated successfully!",
            type: "success",
          });
          setTimeout(() => removeNotification(), 5000);

          // stop Loading
          setLoading(false);

          //Reset Input Fields
          resetCurrentPassword();
          resetNewPassword();
          resetConfirmPassword();

          setPasswordUpdated(true);
        } catch (error) {
          // show a notification popup to user
          showNotification({
            message: "Error updating the password",
            type: "error",
          });
          setTimeout(() => removeNotification(), 5000);

          console.error(`Error updating password ${error}`);
        }
      } else {
        // show a notification popup to user
        showNotification({
          message:
            "Passwords you entered don't match. Please check & try again",
          type: "error",
        });
        setTimeout(() => removeNotification(), 5000);

        console.error("Passwords don't match");
      }
    } catch (error) {
      // show a notification popup to user
      showNotification({
        message: "Password you entered is wrong. Please try again",
        type: "error",
      });
      setTimeout(() => removeNotification(), 5000);

      console.error(error);
    }

    // stop loading
    setLoading(false);
  };

  return (
    <CenteredPage>
      {passwordUpdated ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <HeadingPrimarySlim styles={{ marginBottom: "4rem" }}>
            Your password successfully updated!
          </HeadingPrimarySlim>
          <ButtonStatic onClick={() => history.push("/account")}>
            Head back to your account
          </ButtonStatic>
        </div>
      ) : (
        <Container>
          <HeadingPrimary>Update Password</HeadingPrimary>
          <FormContainer handleSubmit={handleSubmit}>
            <FormField
              id="currentPassword"
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={setCurrentPassword}
              isRequired={true}
            />
            <FormField
              id="newPassword"
              label="New Password"
              type="password"
              value={newPassword}
              onChange={setNewPassword}
              isRequired={true}
            />
            <FormField
              id="confirmNewPassword"
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              isRequired={true}
            />
            <ButtonStatic
              primaryColor="var(--color-primary)"
              secondaryColor="var(--color-white)"
              type="submit"
              isSmall={false}
              loading={loading}
              styles={{ marginTop: "1rem", alignSelf: "stretch  " }}
            >
              Update Password
            </ButtonStatic>
          </FormContainer>
        </Container>
      )}
    </CenteredPage>
  );
};

const mapDispatchToProps = (dispatch) => ({
  showNotification: (notification) => dispatch(showNotification(notification)),
  removeNotification: () => dispatch(removeNotification()),
});

export default connect(null, mapDispatchToProps)(UpdatePassword);
