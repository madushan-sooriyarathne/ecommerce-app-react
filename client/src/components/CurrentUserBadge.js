import React, { useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  signOutUser,
  storage,
  updateCurrentUser,
} from "../utils/FirebaseUtils";

import { updateFavoriteProductList } from "../redux/reducers/favorite-product-list/FavoriteProductListActions";
import {
  showNotification,
  removeNotification,
} from "../redux/reducers/notification/NotifcationActions";

import ButtonStatic from "./buttons/ButtonStatic";

import useStyles from "../styles/components/CurrentUserBadgeStyles";
import sprites from "../img/svg/sprites.svg";

const CurrentUserBadge = ({
  currentUser,
  clearFavoriteList,
  showNotification,
  removeNotification,
  withAccountLink = false,
}) => {
  //Styles
  const classes = useStyles();

  // input field ref
  const fileInputRef = useRef();

  //History object
  const history = useHistory();

  // handle user singed out
  const handleUserSignOut = (event) => {
    try {
      signOutUser();

      // show success notification to user
      showNotification({
        message: "Signed out successfully!",
        type: "success",
      });
      setTimeout(() => removeNotification(), 5000);

      // Clear the favorite list
      clearFavoriteList();

      history.push("/signup");
    } catch (error) {
      // show error notification to user
      showNotification({
        message: "Error occurred while signing out. Please try again",
        type: "error",
      });
      setTimeout(() => removeNotification(), 5000);

      // log error to the console
      console.error(
        `Error Signing out the user ${error.code} : ${error.message}`
      );
    }
  };

  // handle profile picture upload to firebase storage and update the url in firestore db
  const handleFileUpload = async (event) => {
    // create a firebase storage ref
    const storageRef = storage.ref();

    // create a ref for profile pic
    const profilePicRef = storageRef.child(`profiles/${currentUser.id}.jpg`);

    // upload file
    try {
      const profilePicSnapshot = await profilePicRef.put(event.target.files[0]);

      // file upload successful
      // update the imageURL in firestore.
      try {
        const downloadURL = await profilePicSnapshot.ref.getDownloadURL();
        await updateCurrentUser(currentUser.id, { photoURL: downloadURL });
        // profile pic updated in firestore
        // show successful message to user
        showNotification({
          message: "Profile picture updated successfully!",
          type: "success",
        });
        setTimeout(() => removeNotification(), 5000);
      } catch (error) {
        // Show error message to user
        showNotification({
          message:
            "Error occurred while saving the profile picture. Please try again!",
          type: "Error",
        });
        setTimeout(() => removeNotification(), 5000);

        // log error to the console
        console.error(error);
      }
    } catch (error) {
      // Show error message to user
      showNotification({
        message: "Error uploading the profile picture. Please try again!",
        type: "Error",
      });
      setTimeout(() => removeNotification(), 5000);

      // log error to the console
      console.error(error);
    }
  };

  return (
    <div className={classes.CurrentUserBadge}>
      <div className={classes.CurrentUserBadge_Profile}>
        <img
          src={`${currentUser.photoURL}?height=500`}
          alt="Profile"
          className={classes.CurrentUserBadge_profile_image}
        ></img>

        {!withAccountLink && (
          <div className={classes.CurrentUserBadge_profile_image_holder}>
            <input
              ref={fileInputRef}
              type="file"
              className={classes.CurrentUserBadge_file_selector}
              accept="image/*"
              onChange={handleFileUpload}
            ></input>
            <svg className={classes.CurrentUserBadge_profile_image_update}>
              <use xlinkHref={`${sprites}#icon-adduser`}></use>
            </svg>
          </div>
        )}
      </div>

      <div className={classes.CurrentUserBadge_details}>
        <p className={classes.CurrentUserBadge_greeting}>Hey There!</p>
        <p className={classes.CurrentUserBadge_userName}>
          {currentUser.displayName.split(" ")[0]}
        </p>
        <div className={classes.CurrentUserBadge_buttons}>
          {withAccountLink && (
            <Link to="/account">
              <ButtonStatic
                isSmall={true}
                styles={{
                  padding: "1rem",
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  borderRadius: "3px",
                }}
              >
                Account
              </ButtonStatic>
            </Link>
          )}

          <ButtonStatic
            primaryColor="var(--color-danger)"
            isSmall={true}
            onClick={handleUserSignOut}
            styles={{
              padding: "1rem",
              fontSize: "1.2rem",
              fontWeight: "500",
              borderRadius: "3px",
            }}
          >
            Log Out
          </ButtonStatic>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearFavoriteList: () => dispatch(updateFavoriteProductList([])),
  showNotification: (notification) => dispatch(showNotification(notification)),
  removeNotification: () => dispatch(removeNotification()),
});

export default connect(null, mapDispatchToProps)(CurrentUserBadge);
