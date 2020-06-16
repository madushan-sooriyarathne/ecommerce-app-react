import React from "react";
import { Link, useHistory } from "react-router-dom";

import useInputState from "../hooks/UseInputState";

import { signInWithEmailAndPassword } from "../utils/FirebaseUtils";

import FormField from "../components/FormField";
import ButtonStatic from "../components/buttons/ButtonStatic";
import ExternalAuthLink from "../components/ExternalAuthLink";
import Container from "../components/Container";
import HeadingPrimary from "../components/headings/HeadingPrimary";

import useStyles from "../styles/pages/LoginStyles";
import CenteredPage from "./CenteredPage";
import FormContainer from "../components/FormContainer";

const Login = () => {
  //State
  //Input field state
  const [email, updateEmail, resetEmailField] = useInputState("");
  const [password, updatePassword, resetPasswordField] = useInputState("");

  // History
  const history = useHistory();

  //Styles
  const classes = useStyles();

  //form submit event handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    //Submit the data
    try {
      await signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("error Signing with email and password");
    }

    // Clear input fields
    resetEmailField();
    resetPasswordField();
  };

  return (
    <CenteredPage>
      <Container>
        <HeadingPrimary>Hey! Welcome back!</HeadingPrimary>
        <div className={classes.External_Logins}>
          <ExternalAuthLink type="google" />
          <ExternalAuthLink type="facebook" />
        </div>
        <p className={classes.Login_separator}>Or</p>
        <FormContainer handleSubmit={handleSubmit}>
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
          <Link to="/reset-password">Forgot Password?</Link>
          <Link to="/signup">Don't have an account?</Link>
        </div>
      </Container>
    </CenteredPage>
  );
};

export default Login;
