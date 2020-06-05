import React from "react";

import useStyles from "../../styles/components/TypographyStyles";

const HeadingTertiary = ({ children, styles = {} }) => {
  const classes = useStyles();

  return (
    <h3 style={styles} className={classes.HeadingTertiary}>
      {children}
    </h3>
  );
};

export default HeadingTertiary;
