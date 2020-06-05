import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { setCurrentUser } from "../redux/reducers/user/UserActions";

import useInputState from "../hooks/UseInputState";

//Authentication methods
import {
  signupWithGoogle,
  signupWithFacebook,
  signupWithEmailAndPassword,
  persistUser,
} from "../utils/FirebaseUtils";

import FormField from "../components/FormField";
import ButtonStatic from "../components/buttons/ButtonStatic";
import ExternalAuthLink from "../components/ExternalAuthLink";
import Container from "../components/Container";
import HeadingPrimary from "../components/headings/HeadingPrimary";
import FormContainer from "../components/FormContainer";
import CenteredPage from "./CenteredPage";

import useStyles from "../styles/pages/SignupStyles";

const Signup = ({ setCurrentUser }) => {
  // State
  //Input Field state
  const [name, updateName, resetNameField] = useInputState("");
  const [email, updateEmail, resetEmailField] = useInputState("");
  const [password, updatePassword, resetPasswordField] = useInputState("");

  //History object
  const history = useHistory();

  // Styles
  const classes = useStyles();

  // Sign up form submit event handler
  const handleEmailPasswordSignup = async (event) => {
    event.preventDefault();

    //Submit the data
    if (name && password && email) {
      try {
        const userAuth = await signupWithEmailAndPassword(email, password);

        //Persist user to db
        try {
          const currentUser = await persistUser(userAuth, {
            displayName: name,
          });
          // update current user in context
          setCurrentUser(currentUser);
          // Redirect to verify email page
          history.push("/verifyEmail");
        } catch (error) {
          console.error(
            `Error Persisting user to db ${error.code} : ${error.message}`
          );
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    // Clear input fields
    resetNameField();
    resetEmailField();
    resetPasswordField();
  };

  const handleGoogleSignup = async (event) => {
    try {
      const userAuth = await signupWithGoogle();
      console.log("User Signed up with Google", userAuth);

      if (userAuth.emailVerified) {
        // Redirect to homepage on successful signup
        history.push("/");
      } else {
        history.push("/verifyEmail");
      }
    } catch (error) {
      console.error(
        `Error Signing up with Google ${error.code} : ${error.message}`
      );
    }
  };

  const handleFacebookSignup = async (event) => {
    try {
      const userAuth = await signupWithFacebook();
      console.log("User Signed up with facebook", userAuth);

      if (userAuth.emailVerified) {
        // Redirect to home page on successful signup
        history.push("/");
      } else {
        history.push("/verifyEmail");
      }
    } catch (error) {
      console.error(
        `Error Signing up with facebook ${error.code} : ${error.message}`
      );
    }
  };

  return (
    <CenteredPage>
      <Container>
        <HeadingPrimary>Hey! Let's get you set up.</HeadingPrimary>
        <div className={classes.External_Signups}>
          <ExternalAuthLink
            type="google"
            login={false}
            handleAuth={handleGoogleSignup}
          />
          <ExternalAuthLink
            type="facebook"
            login={false}
            handleAuth={handleFacebookSignup}
          />
        </div>
        <p className={classes.Signup_separator}>Or</p>
        <FormContainer handleSubmit={handleEmailPasswordSignup}>
          <FormField
            id="nameField"
            label="Name"
            type="text"
            value={name}
            onChange={updateName}
            isRequired={true}
          />
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
            primaryColor="#3C2858"
            secondaryColor="#fff"
            type="submit"
            isSmall={true}
            styles={{ marginTop: "1rem", alignSelf: "stretch  " }}
          >
            Sign Up
          </ButtonStatic>
        </FormContainer>
        <div className={classes.RedirectLinks}>
          <Link to="/signup">Already have an account?</Link>
        </div>
      </Container>
    </CenteredPage>
  );
};

//Redux Mappings
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(Signup);
