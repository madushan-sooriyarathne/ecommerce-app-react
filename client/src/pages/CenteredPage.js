import React from "react";
import useStyles from "../styles/pages/CenteredPageStyles";

const CenteredPage = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.CenteredPage}>{children}</div>;
};

export default CenteredPage;
