import React from "react";
import useStyles from "../styles/pages/PageStyles";

const Page = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.Page}>{children}</div>;
};

export default Page;
