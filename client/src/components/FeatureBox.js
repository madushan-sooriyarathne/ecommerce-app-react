import React from "react";

import useStyles from "../styles/components/FeatureBoxStyles";

const FeatureBox = ({ img, title, description }) => {
  const classes = useStyles();
  return (
    <div className={classes.FeatureBox}>
      <img className={classes.FeatureBox_img} src={img} alt={title}></img>
      <h1 className={classes.FeatureBox_title}>{title}</h1>
      <p className={classes.FeatureBox_description}>{description}</p>
    </div>
  );
};

export default FeatureBox;
