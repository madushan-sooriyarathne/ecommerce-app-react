import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import firebase, { auth } from "../utils/FirebaseUtils";

import {
  showNotification,
  removeNotification,
} from "../redux/reducers/notification/NotifcationActions";
import useInputState from "../hooks/UseInputState";

import CenteredPage from "./CenteredPage";
import Container from "../components/Container";
import HeadingPrimary from "../components/headings/HeadingPrimary";
import HeadingPrimarySlim from "../components/headings/HeadingPrimarySlim";
import FormContainer from "../components/FormContainer";
import FormField from "../components/FormField";
import ButtonStatic from "../components/buttons/ButtonStatic";

const UpdateEmail = ({ showNotification, removeNotification }) => {
  // history hook
  const history = useHistory();

  // input field states
  const [currentEmail, updateCurrentEmail, resetCurrentEmail] = useInputState(
    ""
  );
  const [password, updatePassword, resetPassword] = useInputState("");
  const [newEmail, updateNewEmail, resetNewEmail] = useInputState("");

  const [emailUpdated, setEmailUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // set Loading
    setLoading(true);

    try {
      const currentUser = auth.currentUser;

      const credentials = firebase.auth.EmailAuthProvider.credential(
        currentEmail,
        password
      );

      // re-authenticate the user with credentials created using user given email and password
      await currentUser.reauthenticateWithCredential(credentials);

      // user is re-authenticated
      //change the email of current user
      try {
        await currentUser.updateEmail(newEmail);

        // Email updated!
        // show notification

        // show error popup to user
        showNotification({
          message: "Email updated successfully",
          type: "success",
        });
        setTimeout(() => removeNotification(), 5000);

        // show goto verify email page button
        setEmailUpdated(true);
      } catch (error) {
        // show error popup to user
        showNotification({
          message: "Error updating email. Please try again",
          type: "error",
        });
        setTimeout(() => removeNotification(), 5000);

        console.error(error);
      }
    } catch (error) {
      // show error popup to user
      showNotification({
        message: error.message,
        type: "error",
      });
      setTimeout(() => removeNotification(), 5000);

      // can't authenticate the user with given email and password
      console.error(error);
    }

    // stop loading
    setLoading(false);
  };

  return (
    <CenteredPage>
      {emailUpdated ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <HeadingPrimarySlim styles={{ marginBottom: "4rem" }}>
            Your email successfully updated!
          </HeadingPrimarySlim>
          <ButtonStatic
            isSmall={true}
            onClick={() => history.push("/verifyEmail")}
          >
            Verify Email
          </ButtonStatic>
        </div>
      ) : (
        <Container>
          <HeadingPrimary>Update Email</HeadingPrimary>
          <FormContainer handleSubmit={handleSubmit}>
            <FormField
              id="CurrentEmailField"
              label="Current Email"
              type="email"
              value={currentEmail}
              onChange={updateCurrentEmail}
              isRequired={true}
            />
            <FormField
              id="passwordField"
              label="Your Password"
              type="password"
              value={password}
              onChange={updatePassword}
              isRequired={true}
            />
            <FormField
              id="NewEmailField"
              label="New Email"
              type="email"
              value={newEmail}
              onChange={updateNewEmail}
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
              Update Email
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

export default connect(null, mapDispatchToProps)(UpdateEmail);
