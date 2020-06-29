import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import { addToFavorite, removeFavorite } from "../utils/FirebaseUtils";

import {
  showNotification,
  removeNotification,
} from "../redux/reducers/notification/NotifcationActions";

import sprites from "../img/svg/sprites.svg";

import useStyles from "../styles/components/AddToFavoriteButtonStyles";

const AddToFavoriteButton = (props) => {
  // Destructuring the props
  const {
    currentUserId,
    productId,
    isFavorite,
    removeFromFavoriteList,
    addToFavoriteList,
    showNotification,
    removeNotification,
    isSmall = false,
  } = props;
  // Styles
  const classes = useStyles({ isSmall });

  // Adding to user's favorite list
  // This favorite list is just a redux state.
  // Firebase user's favorite list update functionality is in below useEffect() hook
  const handleFavorite = (event) => {
    event.stopPropagation();

    if (isFavorite) {
      removeFromFavoriteList(productId);
      showNotification({
        message: "item removed from your favorite list",
        type: "success",
      });
      setTimeout(() => removeNotification(), 5000);
    } else {
      addToFavoriteList(productId);
      showNotification({
        message: "item added to your favorite list",
        type: "success",
      });
      setTimeout(() => removeNotification(), 5000);
    }
  };

  // TODO: Extract a custom hook from below code.
  const ref = useRef(false);
  useEffect(() => {
    const updateFavoriteStatus = async () => {
      if (ref.current) {
        // if there is no users logged in skip this
        if (currentUserId) {
          if (isFavorite) {
            await addToFavorite(currentUserId, productId);
          } else {
            await removeFavorite(currentUserId, productId);
          }
        }
      } else {
        ref.current = true;
      }
    };

    updateFavoriteStatus();
  }, [isFavorite, currentUserId, productId]);

  if (currentUserId) {
    return (
      <svg className={classes.AddToFavoriteButton} onClick={handleFavorite}>
        {isFavorite ? (
          <use xlinkHref={`${sprites}#icon-heart-filled`}></use>
        ) : (
          <use xlinkHref={`${sprites}#icon-heart-empty`}></use>
        )}
      </svg>
    );
  } else {
    return <></>;
  }
};

const mapDispatchToProps = (dispatch) => ({
  showNotification: (notification) => dispatch(showNotification(notification)),
  removeNotification: () => dispatch(removeNotification()),
});

export default connect(null, mapDispatchToProps)(AddToFavoriteButton);
