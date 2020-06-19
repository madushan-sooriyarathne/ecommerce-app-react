import React, { useState } from "react";

import useInputState from "../hooks/UseInputState";

import CenteredPage from "./CenteredPage";

import Container from "../components/Container";
import FormField from "../components/FormField";
import HeadingPrimarySlim from "../components/headings/HeadingPrimarySlim";

import useStyles from "../styles/components/SendResetPasswordStyles";
import FormContainer from "../components/FormContainer";
import ButtonStatic from "../components/buttons/ButtonStatic";
import { auth } from "../utils/FirebaseUtils";

const SendResetPassword = () => {
  // JSS styles hook
  const classes = useStyles();

  // state
  const [emailsent, setEmailSent] = useState(false);

  // form field state
  const [email, updateEmail, resetEmail] = useInputState();

  // form submit event handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    // send password reset email to given email
    try {
      await auth.sendPasswordResetEmail(email);
      // email is sent
      // show success message to user
    } catch (error) {
      console.error(error);
    }

    alert(email);
  };

  return (
    <CenteredPage>
      <div className={classes.SendResetPassword}>
        <HeadingPrimarySlim styles={{ marginBottom: "4rem" }}>
          Please enter your email
        </HeadingPrimarySlim>
        <FormContainer handleSubmit={handleSubmit}>
          <FormField
            label="Email"
            id="emailField"
            type="email"
            value={email}
            onChange={updateEmail}
          ></FormField>
          <ButtonStatic type="submit" isSmall={true}>
            Send password reset email
          </ButtonStatic>
        </FormContainer>
      </div>
    </CenteredPage>
  );
};

export default SendResetPassword;
