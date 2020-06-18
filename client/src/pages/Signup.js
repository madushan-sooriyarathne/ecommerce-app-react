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
  auth,
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
import {
  showNotification,
  removeNotification,
} from "../redux/reducers/notification/NotifcationActions";
import { updateFavoriteProductList } from "../redux/reducers/favorite-product-list/FavoriteProductListActions";

const Signup = ({
  setCurrentUser,
  showNotification,
  removeNotification,
  updateFavorites,
}) => {
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

        const user = await persistUser(userAuth.user, { displayName: name });

        setCurrentUser(user);

        if (user) {
          updateFavorites(user.favorites);
        }

        // show notification to user
        showNotification({
          message: "Successfully signed up with Email",
          type: "success",
        });
        setTimeout(() => removeNotification(), 5000);
      } catch (error) {
        showNotification({
          message: "Error Occurred while signing up with Email",
          type: "error",
        });
        setTimeout(() => removeNotification(), 5000);

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

      showNotification({
        message: "User Signed up with Google",
        type: "success",
      });
      setTimeout(() => removeNotification(), 5000);

      if (userAuth.emailVerified) {
        // Redirect to homepage on successful signup
        history.push("/");
      } else {
        history.push("/verifyEmail");
      }
    } catch (error) {
      showNotification({
        message: "Error Occurred while signing up with Google",
        type: "error",
      });
      setTimeout(() => removeNotification(), 5000);

      // console out the error
      console.error(
        `Error Signing up with Google ${error.code} : ${error.message}`
      );
    }
  };

  const handleFacebookSignup = async (event) => {
    try {
      const userAuth = await signupWithFacebook();

      showNotification({
        message: "User Signed up with Facebook",
        type: "success",
      });
      setTimeout(() => removeNotification(), 5000);

      if (userAuth.emailVerified) {
        // Redirect to home page on successful signup
        history.push("/");
      } else {
        history.push("/verifyEmail");
      }
    } catch (error) {
      showNotification({
        message: "Error Occurred while signing up with Facebook",
        type: "error",
      });
      setTimeout(() => removeNotification(), 5000);

      // Console out the error
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
  showNotification: (notification) => dispatch(showNotification(notification)),
  removeNotification: () => dispatch(removeNotification()),
  updateFavorites: (favoriteItemList) =>
    dispatch(updateFavoriteProductList(favoriteItemList)),
});

export default connect(null, mapDispatchToProps)(Signup);
