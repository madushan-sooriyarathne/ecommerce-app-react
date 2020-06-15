import React from "react";

import useStyles from "../styles/components/SnackBarStyles";

import sprites from "../img/svg/sprites.svg";
import { connect } from "react-redux";

const SnackBar = ({ notification }) => {
  // JSS styles hook
  const classes = useStyles();

  if (notification) {
    const color =
      notification.type === "error"
        ? "var(--color-error)"
        : notification.type === "warning"
        ? "var(--color-danger)"
        : "var(--color-success)";

    return (
      <div
        className={`${classes.SnackBar} ${
          notification && classes.SnackBar_show
        }`}
        style={{ backgroundColor: color }}
      >
        <p className={classes.SnackBar_message}>{notification.message}</p>
        <button className={classes.SnackBar_closeButton}>
          <svg>
            <use xlinkHref={`${sprites}#icon-close`}></use>
          </svg>
        </button>
      </div>
    );
  } else {
    return <div className={classes.SnackBar}></div>;
  }
};

const mapStateToProps = (state) => ({
  notification: state.notifications.notification,
});

export default connect(mapStateToProps, null)(SnackBar);
