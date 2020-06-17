import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { auth } from "../utils/FirebaseUtils";

import {
  showNotification,
  removeNotification,
} from "../redux/reducers/notification/NotifcationActions";

import useInputState from "../hooks/UseInputState";
import FormField from "../components/FormField";
import ButtonStatic from "../components/buttons/ButtonStatic";
import CenteredPage from "./CenteredPage";

import useStyles from "../styles/pages/EmailActionHandlerStyles";

const ResetPassword = ({ oobCode, continueUrl }) => {
  //State
  const [passwordChangeError, setPasswordChangeError] = useState(null);
  const [codeVerifiedError, setCodeVerifiedError] = useState(null);
  const [email, setEmail] = useState(null);
  const [codeVerified, setCodeVerified] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("/");
  const [password, setPassword, resetPassword] = useInputState("");

  // Styles
  const classes = useStyles();

  useEffect(() => {
    const verifyActionCode = async () => {
      try {
        const email = await auth.verifyPasswordResetCode(oobCode);
        // Action code is verified
        setEmail(email);

        setCodeVerified(true);
      } catch (error) {
        // Action code is expired or already used.
        setCodeVerifiedError(
          error.code === "auth/invalid-action-code" &&
            "Link is expired, or has already been used."
        );

        // Show error message popup to user
        showNotification({
          message: "Link is Expired or has already been used",
          type: "error",
        });
        setTimeout(() => {
          removeNotification();
        }, 5000);
      }
    };
    verifyActionCode();
  }, [oobCode]);

  const handleSubmit = async (event) => {
    try {
      await auth.confirmPasswordReset(oobCode, password);
      // Password reset successful
      setPasswordChanged(true);

      // how success message popup to user
      showNotification({
        message: "Password was reset successfully",
        type: "success",
      });
      setTimeout(() => {
        removeNotification();
      }, 5000);

      // Set the redirect url if there is redirect url given
      if (continueUrl) {
        setRedirectUrl(continueUrl);
      }
    } catch (error) {
      // Password reset is not successful

      // show error message popup to user
      showNotification({
        message: "Error occurred while resetting the password",
        type: "error",
      });
      setTimeout(() => {
        removeNotification();
      }, 5000);

      // console out the error
      console.error(`Error resetting the password : ${error.message}`);
      setPasswordChangeError(error.message);
    }

    //Clear the field
    resetPassword();
  };

  if (codeVerifiedError) {
    return (
      <CenteredPage>
        <div className={classes.Element_container}>
          <div className={classes.Error}>{codeVerifiedError}</div>
          <Link to="/login">
            <ButtonStatic
              primaryColor="var(--color-primary)"
              secondaryColor="var(--color-white)"
              isSmall={true}
              styles={{ marginTop: "3rem" }}
            >
              Go Back to Login Page
            </ButtonStatic>
          </Link>
        </div>
      </CenteredPage>
    );
  }
  if (!codeVerified) {
    return (
      <CenteredPage>
        <div>Loading</div>
      </CenteredPage>
    );
  }
  if (passwordChanged) {
    return (
      <CenteredPage>
        {passwordChangeError ? (
          <div className={classes.Element_container}>
            <div className={classes.Error}>{passwordChangeError}</div>
            <Link to="/login">
              <ButtonStatic
                primaryColor="var(--color-primary)"
                secondaryColor="var(--color-white)"
                isSmall={true}
                styles={{ marginTop: "3rem" }}
              >
                Go Back to Login Page
              </ButtonStatic>
            </Link>
          </div>
        ) : (
          <div className={classes.Success}>Password Changed!</div>
        )}
      </CenteredPage>
    );
  } else {
    return (
      <CenteredPage>
        <div className={classes.Element_container}>
          <form onSubmit={handleSubmit}>
            <FormField
              id="passwordField"
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              isRequired={true}
            />
            <ButtonStatic
              primaryColor="var(--color-primary)"
              secondaryColor="var(--color-white)"
              type="submit"
              isSmall={true}
              styles={{ marginTop: "1rem", alignSelf: "stretch" }}
            >
              Reset Password
            </ButtonStatic>
          </form>
        </div>
      </CenteredPage>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  showNotification: (notification) => dispatch(showNotification(notification)),
  removeNotification: () => dispatch(removeNotification()),
});

export default connect(null, mapDispatchToProps)(ResetPassword);
