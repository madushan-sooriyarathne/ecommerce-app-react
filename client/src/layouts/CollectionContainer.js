import React from "react";

import useStyles from "../styles/layouts/CollectionContainerStyles";

const CollectionContainer = ({ children, styles = {} }) => {
  const classes = useStyles();

  return (
    <div style={styles} className={classes.CollectionContainer}>
      {children}
    </div>
  );
};

export default CollectionContainer;
