import React from "react";

import useStyles from "../../styles/components/ButtonStyles";

const ButtonAnimated = ({
  children,
  onClick = (event) => {},
  primaryColor = "var(--color-primary)",
  secondaryColor = "var(--color-white)",
  styles = {},
  isSmall = false,
}) => {
  const classes = useStyles({ primaryColor, secondaryColor, isSmall });
  return (
    <button
      style={styles}
      className={`${classes.Button} ${classes.ButtonAnimated}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonAnimated;
