import React from "react";

import useStyles from "../styles/components/LinkStyles";

const Link = ({ href, children, target = "_self", styles = {} }) => {
  const classes = useStyles();

  return (
    <a
      className={classes.Link}
      href={href}
      target={target}
      style={styles}
      rel={target === "_blank" && "nonref nonopener"}
    >
      {children}
    </a>
  );
};

export default Link;
