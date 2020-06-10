import React from "react";

import sprites from "../img/svg/sprites.svg";

import useStyles from "../styles/components/AddToFavoriteButtonStyles";

const AddToFavoriteButton = ({
  productId,
  isFavorite,
  removeFromFavorite,
  addToFavorite,
}) => {
  // Styles
  const classes = useStyles();

  const handleFavorite = (event) => {
    if (isFavorite) {
      removeFromFavorite(productId);
    } else {
      addToFavorite(productId);
    }
  };

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
