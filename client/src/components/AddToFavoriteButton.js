import React, { useEffect, useRef } from "react";

import { addToFavorite, removeFavorite } from "../utils/FirebaseUtils";

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
    } else {
      addToFavoriteList(productId);
    }
  };

  // TODO: Extract a custom hook from below code.
  const ref = useRef(false);
  useEffect(() => {
    const updateFavoriteStatus = async () => {
      if (ref.current) {
        if (isFavorite) {
          await addToFavorite(currentUserId, productId);
        } else {
          await removeFavorite(currentUserId, productId);
        }
      } else {
        ref.current = true;
      }
    };

    updateFavoriteStatus();
  }, [isFavorite, currentUserId]);

  return (
    <svg className={classes.AddToFavoriteButton} onClick={handleFavorite}>
      {isFavorite ? (
        <use xlinkHref={`${sprites}#icon-heart-filled`}></use>
      ) : (
        <use xlinkHref={`${sprites}#icon-heart-empty`}></use>
      )}
    </svg>
  );
};

export default AddToFavoriteButton;
