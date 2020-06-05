import React from "react";

import useStyles from "../../styles/components/TypographyStyles";

const HeadingSecondarySlim = ({ children, styles = {} }) => {
  const classes = useStyles();

  return (
    <h2 style={styles} className={classes.HeadingSecondary_slim}>
      {children}
    </h2>
  );
};

export default HeadingSecondarySlim;
