import React from "react";
import useStyles from "../../styles/components/TypographyStyles";

const HeadingPrimarySlim = ({ children, styles = {} }) => {
  const classes = useStyles();
  return (
    <h1 style={styles} className={classes.HeadingPrimary_slim}>
      {children}
    </h1>
  );
};

export default HeadingPrimarySlim;
