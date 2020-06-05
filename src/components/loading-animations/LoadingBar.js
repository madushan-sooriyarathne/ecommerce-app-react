import React from "react";

import useStyles from "../../styles/components/loading-animations/LoadingBarStyles";

const LoadingBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.LoadingBar}>
      <div className={classes.LoadingBar_circle}></div>
    </div>
  );
};

export default LoadingBar;
