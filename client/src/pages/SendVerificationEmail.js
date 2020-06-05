import React, { useState } from "react";
import { Link } from "react-router-dom";

import { auth } from "../utils/FirebaseUtils";

import CenteredPage from "./CenteredPage";
import ButtonStatic from "../components/buttons/ButtonStatic";

import useStyles from "../styles/pages/EmailActionHandlerStyles";

const SendVerificationEmail = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);

  //styles
  const classes = useStyles();

  // onClick handler
  const handleSendEmail = async (event) => {
    try {
      await auth.currentUser.sendEmailVerification();

      // Email Sent
      setEmailSent(true);
    } catch (error) {
      //   setEmailSent(true);
      setError(error.message);
      console.error(error);
    }
  };

  if (error) {
    return (
      <CenteredPage>
        <div className={classes.Element_container}>
          <div className={classes.Error}>
            Failed to send Verification email. Please try again
          </div>
        </div>
      </CenteredPage>
    );
  }

  if (emailSent) {
    return (
      <CenteredPage>
        <div className={classes.Element_container}>
          <div className={classes.Success}>
            Verification email sent. Kindly check your email{" "}
          </div>
          <Link to="/">
            <ButtonStatic
              primaryColor="var(--color-primary)"
              secondaryColor="var(--color-white)"
              isSmall={true}
              styles={{ marginTop: "3rem" }}
            >
              Head back to the home page
            </ButtonStatic>
          </Link>
        </div>
      </CenteredPage>
    );
  } else {
    return (
      <CenteredPage>
        <div className={classes.Element_container}>
          <div className={classes.Success}>
            Please verify your email address
          </div>
          <ButtonStatic
            primaryColor="var(--color-primary)"
            secondaryColor="var(--color-white)"
            isSmall={true}
            styles={{ marginTop: "3rem" }}
            onClick={handleSendEmail}
          >
            Send Verification Email
          </ButtonStatic>
        </div>
      </CenteredPage>
    );
  }
};

export default SendVerificationEmail;
