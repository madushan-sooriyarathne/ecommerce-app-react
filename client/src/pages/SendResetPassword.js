import React from "react";

import useStyles from "../styles/components/SendResetPasswordStyles";

const SendResetPassword = () => {
  // JSS styles hook
  const classes = useStyles();

  return (
    <div className={classes.SendResetPassword}>
      <h1>Send Reset Password</h1>
    </div>
  );
};

export default SendResetPassword;
