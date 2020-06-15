import React from "react";
import { useHistory, Link } from "react-router-dom";

import { signOutUser } from "../utils/FirebaseUtils";

import ButtonStatic from "./buttons/ButtonStatic";

import useStyles from "../styles/components/CurrentUserBadgeStyles";
import { updateFavoriteProductList } from "../redux/reducers/favorite-product-list/FavoriteProductListActions";
import { connect } from "react-redux";

const CurrentUserBadge = ({
  username,
  displayImage,
  clearFavoriteList,
  withAccountLink = false,
}) => {
  //Styles
  const classes = useStyles();

  //History object
  const history = useHistory();

  const handleUserSignOut = (event) => {
    try {
      signOutUser();

      // Clear the favorite list
      clearFavoriteList();

      history.push("/signup");
    } catch (error) {
      console.error(
        `Error Signing out the user ${error.code} : ${error.message}`
      );
    }
  };

  return (
    <div className={classes.CurrentUserBadge}>
      <img
        src={`${displayImage}?height=500`}
        alt="Profile"
        className={classes.CurrentUserBadge_profile_image}
      ></img>
      <div className={classes.CurrentUserBadge_details}>
        <p className={classes.CurrentUserBadge_greeting}>Hey There!</p>
        <p className={classes.CurrentUserBadge_userName}>{username}</p>
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
            primaryColor="#ea9410"
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
});

export default connect(null, mapDispatchToProps)(CurrentUserBadge);
