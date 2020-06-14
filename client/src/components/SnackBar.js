import React from "react";

import useStyles from "../styles/components/SnackBarStyles";

import sprites from "../img/svg/sprites.svg";

const SnackBar = () => {
  // JSS styles hook
  const classes = useStyles();

  if (notification) {
    return (
      <div className={classes.SnackBar}>
        <p className={classes.SnackBar_message}>{Notification.message}</p>
        <svg className={classes.SnackBar_closeButton}>
          <use xlinkHref={`${sprites}#icon-close`}></use>
        </svg>
      </div>
    );
  } else {
    return <></>;
  }
};

export default SnackBar;
