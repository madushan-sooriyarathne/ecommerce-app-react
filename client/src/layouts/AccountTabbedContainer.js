import React from "react";

import useStyles from "../styles/layouts/AcccountTabbedContainerStyles";
import HeadingPrimary from "../components/headings/HeadingPrimary";

const AccountTabbedContainer = ({ id, title, buttons = [], children }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.AccountTabbedContainer} ${id}`}>
      <HeadingPrimary className={classes.AccountTabbedContainer_heading}>
        {title}
      </HeadingPrimary>
      <div className={classes.AccountTabbedContainer_buttons}>{buttons}</div>
      <div className={classes.Content}>{children}</div>
    </div>
  );
};

export default AccountTabbedContainer;
