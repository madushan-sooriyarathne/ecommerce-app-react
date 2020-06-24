import React from "react";

import useStyles from "../styles/components/LinkStyles";

const Link = ({ href, children, fontSize = "1.8rem" }) => {
  const classes = useStyles({ fontSize });

  return (
    <a className={classes.Link} href={href}>
      {children}
    </a>
  );
};

export default Link;
