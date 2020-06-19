import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import useInputState from "../hooks/UseInputState";

import {
  signInWithEmailAndPassword,
  persistUser,
  signupWithGoogle,
  signupWithFacebook,
} from "../utils/FirebaseUtils";

import {
  showNotification,
  removeNotification,
} from "../redux/reducers/notification/NotifcationActions";

import FormField from "../components/FormField";
import ButtonStatic from "../components/buttons/ButtonStatic";
import ExternalAuthLink from "../components/ExternalAuthLink";
import Container from "../components/Container";
import HeadingPrimary from "../components/headings/HeadingPrimary";

import useStyles from "../styles/pages/LoginStyles";
import CenteredPage from "./CenteredPage";
import FormContainer from "../components/FormContainer";

const Login = ({ showNotification, removeNotification }) => {
  //State
  //Input field state
  const [email, updateEmail, resetEmailField] = useInputState("");
  const [password, updatePassword, resetPasswordField] = useInputState("");

  // History
  const history = useHistory();

  //Styles
  const classes = useStyles();

  //form submit event handler
  const handleSigninForm = async (event) => {
    event.preventDefault();

    //Submit the data
    try {
      await signInWithEmailAndPassword(email, password);

      // show success notification to user
      showNotification({
        message: "Successfully signed in with email and password",
        type: "success",
      });
      setTimeout(() => removeNotification(), 5000);

      // Clear input fields
      resetEmailField();
      resetPasswordField();
    } catch (error) {
      // show success notification to user
      showNotification({
        message: `Error occurred while signing in - ${error.message}`,
        type: "error",
      });
      setTimeout(() => removeNotification(), 5000);

      console.error(error);
    }
  };

  // Google signup handler
  const signInWithGoogle = async (event) => {
    try {
      await signupWithGoogle();
      // show success notification to user
      showNotification({
        message: "Successfully signed in with Google",
        type: "success",
      });
      setTimeout(() => removeNotification(), 5000);
    } catch (error) {
      // show success notification to user
      showNotification({
        message: "Error occurred while signing with Google",
        type: "error",
      });
      setTimeout(() => removeNotification(), 5000);
      console.error(`Error while signing in with Google : ${error.message}`);
    }
  };

  // Facebook signup handler
  const signInWithFacebook = async (event) => {
    try {
      await signupWithFacebook();
      // show success notification to user
      showNotification({
        message: "Successfully signed in with Facebook",
        type: "success",
      });
      setTimeout(() => removeNotification(), 5000);
    } catch (error) {
      // show success notification to user
      showNotification({
        message: "Error occurred while signing with Facebook",
        type: "error",
      });
      setTimeout(() => removeNotification(), 5000);
      console.error(`Error while signing in with Facebook : ${error.message}`);
    }
  };

  return (
    <CenteredPage>
      <Container>
        <HeadingPrimary>Hey! Welcome back!</HeadingPrimary>
        <div className={classes.External_Logins}>
          <ExternalAuthLink type="google" handleAuth={signInWithGoogle} />
          <ExternalAuthLink type="facebook" handleAuth={signInWithFacebook} />
        </div>
        <p className={classes.Login_separator}>Or</p>
        <FormContainer handleSubmit={handleSigninForm}>
          <FormField
            id="emailField"
            label="Email"
            type="email"
            value={email}
            onChange={updateEmail}
            isRequired={true}
          />
          <FormField
            id="passwordField"
            label="Password"
            type="password"
            value={password}
            onChange={updatePassword}
            isRequired={true}
          />
          <ButtonStatic
            type="submit"
            isSmall={true}
            styles={{ marginTop: "1rem", alignSelf: "stretch  " }}
          >
            Log In
          </ButtonStatic>
        </FormContainer>
        <div className={classes.RedirectLinks}>
          <Link to="/resetPassword">Forgot Password?</Link>
          <Link to="/signup">Don't have an account?</Link>
        </div>
      </Container>
    </CenteredPage>
  );
};

const mapDispatchToProps = (dispatch) => ({
  showNotification: (notification) => dispatch(showNotification(notification)),
  removeNotification: () => dispatch(removeNotification()),
});

export default connect(null, mapDispatchToProps)(Login);
