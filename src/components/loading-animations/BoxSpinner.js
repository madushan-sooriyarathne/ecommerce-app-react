import React from "react";

import useStyles from "../../styles/components/loading-animations/BoxSpinnerStyles";

const BoxSpinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.BoxSpinner}>
      <div className={classes.BoxSpinner_box}></div>
    </div>
  );
};

export default BoxSpinner;
