import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { auth } from "../utils/FirebaseUtils";

import ButtonStatic from "../components/buttons/ButtonStatic";
import CenteredPage from "./CenteredPage";

import useStyles from "../styles/pages/EmailActionHandlerStyles";

const EmailVerification = ({ oobCode }) => {
  //State
  const [error, setError] = useState(null);
  const [verified, setVerified] = useState(false);
  const [codeValid, setCodeValid] = useState(false);

  //Styles
  const classes = useStyles();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await auth.applyActionCode(oobCode);
        setCodeValid(true);
        setVerified(true);
      } catch (error) {
        setCodeValid(true);
        setError(
          error.code === "auth/invalid-action-code" &&
            "Link is expired or already used. "
        );
        console.error(error.message);
      }
    };
    verifyEmail();
  }, [oobCode]);

  if (!codeValid) {
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
            {verified && "Your Email is Verified"}
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
