import React from "react";
import useStyles from "../../styles/components/TypographyStyles";

const HeadingPrimary = ({ children, styles = {} }) => {
  const classes = useStyles();
  return (
    <h1 style={styles} className={classes.HeadingPrimary}>
      {children}
    </h1>
  );
};

export default HeadingPrimary;
