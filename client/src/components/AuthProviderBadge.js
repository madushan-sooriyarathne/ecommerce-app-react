import React from "react";

import useStyles from "../styles/components/AuthProviderBadgeStyles";

import facebookLogo from "../img/svg/facebook.svg";
import googleLogo from "../img/svg/google.svg";

const AuthProviderBadge = ({ providerId }) => {
  // JSS styles hook
  const classes = useStyles();

  return (
    <div className={classes.AuthProviderBadge}>
      <div className={classes.Logo}>
        {providerId === "google.com" ? (
          <img
            src={googleLogo}
            alt="Google Logo"
            className={classes.LogoImg}
          ></img>
        ) : (
          <img
            src={facebookLogo}
            alt="Facebook Logo"
            className={classes.LogoImg}
          ></img>
        )}
      </div>
      <p className={classes.ProviderText}>
        {providerId === "google.com"
          ? "Signed in via Google"
          : "Signed in via Facebook"}
      </p>
    </div>
  );
};

export default AuthProviderBadge;
