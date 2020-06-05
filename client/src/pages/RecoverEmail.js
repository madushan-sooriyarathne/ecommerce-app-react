import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { auth } from "../utils/FirebaseUtils";

import ButtonStatic from "../components/buttons/ButtonStatic";
import CenteredPage from "./CenteredPage";

import useStyles from "../styles/pages/EmailActionHandlerStyles";

const EmailVerification = ({ oobCode }) => {
  //State
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [recovered, setRecovered] = useState(false);
  const [codeChecked, setCodeChecked] = useState(false);

  //Styles
  const classes = useStyles();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const info = await auth.checkActionCode(oobCode);
        //Code is verified
        setCodeChecked(true);

        setEmail(info.data.email);

        // Recover email
        auth.applyActionCode(oobCode);

        // Email Recovered
        setRecovered(true);
      } catch (error) {
        setCodeChecked(true);

        let errorMessage;

        if (error.code === "auth/invalid-action-code") {
          errorMessage = "Link is expired or already used.";
        } else {
          errorMessage = "Failed to recover email!";
        }
        setError(errorMessage);
      }
    };
    verifyEmail();
  }, [oobCode]);

  if (!codeChecked) {
    return (
      <CenteredPage>
        <div className={classes.Loading}>Loading...</div>
      </CenteredPage>
    );
  }
  if (error) {
    return (
      <CenteredPage>
        <div className={classes.Element_container}>
          <div className={classes.Error}>{error}</div>
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
            {recovered && `Your Email is recovered back to ${email}`}
          </div>
          <Link to="/">
            <ButtonStatic
              primaryColor="var(--color-primary)"
              secondaryColor="var(--color-white)"
              isSmall={true}
              styles={{ marginTop: "1rem" }}
            >
              Head back to the home page
            </ButtonStatic>
          </Link>
        </div>
      </CenteredPage>
    );
  }
};

export default EmailVerification;
