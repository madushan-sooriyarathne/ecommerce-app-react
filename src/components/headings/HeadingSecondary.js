import React from "react";

import useStyles from "../../styles/components/TypographyStyles";

const HeadingSecondary = ({ children, styles = {} }) => {
  const classes = useStyles();

  return (
    <h2 style={styles} className={classes.HeadingSecondary}>
      {children}
    </h2>
  );
};

export default HeadingSecondary;
