import React from "react";

import useStyles from "../styles/layouts/PopupStyles";

import sprites from "../img/svg/sprites.svg";

const Popup = ({ showPopup, handlePopupClose, children }) => {
  // JSS style hook
  const classes = useStyles();

  return (
    <div className={`${classes.Popup} ${showPopup && classes.Popup_show}`}>
      <div className={classes.Popup_Overlay} onClick={handlePopupClose}></div>
      <div className={classes.Popup_Box}>
        <svg className={classes.Box_close} onClick={handlePopupClose}>
          <use xlinkHref={`${sprites}#icon-close`}></use>
        </svg>
        {children}
      </div>
    </div>
  );
};

export default Popup;
