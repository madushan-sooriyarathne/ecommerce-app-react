import React from "react";
import { Redirect } from "react-router-dom";
import EmailVerification from "./EmailVerification";
import ResetPassword from "./ResetPassword";
import RecoverEmail from "./RecoverEmail";

const EmailActionHandler = () => {
  const url = new URL(document.location.href);

  const mode = url.searchParams.get("mode");
  const oobCode = url.searchParams.get("oobCode");

  switch (mode) {
    case "verifyEmail":
      return <EmailVerification oobCode={oobCode} />;
    case "resetPassword":
      return <ResetPassword oobCode={oobCode} />;
    case "recoverEmail":
      return <RecoverEmail oobCode={oobCode} />;
    default:
      return <Redirect to="/" />;
  }
};

export default EmailActionHandler;
