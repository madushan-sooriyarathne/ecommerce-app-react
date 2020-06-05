import React from "react";

import useStyles from "../styles/components/ExternalAuthLinkStyles";

import logoFacebook from "../img/svg/facebook.svg";
import logoGoogle from "../img/svg/google.svg";
import logoTwitter from "../img/svg/twitter.svg";

const vendors = {
  facebook: logoFacebook,
  google: logoGoogle,
  twitter: logoTwitter,
};
const ExternalAuthLink = ({ type, handleAuth, login = true }) => {
  const classes = useStyles();

  return (
    <div className={classes.ExternalAuthLink} onClick={handleAuth}>
      <img
        className={classes.Vendor_logo}
        src={vendors[type]}
        alt="Facebook"
      ></img>
      <p className={classes.Vendor_name}>{login ? "Log in" : "Sign up"}</p>
    </div>
  );
};

export default ExternalAuthLink;
