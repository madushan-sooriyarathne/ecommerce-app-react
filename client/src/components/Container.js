import React from "react";
import useStyles from "../styles/components/ContainerStyles";

const Container = ({ children, styles = {} }) => {
  const classes = useStyles();

  return (
    <div style={styles} className={classes.Container}>
      {children}
    </div>
  );
};

export default Container;
