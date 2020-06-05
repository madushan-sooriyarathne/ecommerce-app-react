import React from "react";

import useStyles from "../../styles/components/loading-animations/LoadingSpinnerStyles";

const LoadingSpinner = (small = false, color = "var(--color-primary)") => {
  const classes = useStyles(small, color);

  return (
    <div className={classes.LoadingSpinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
