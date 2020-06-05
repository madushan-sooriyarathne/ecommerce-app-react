import React from "react";

import useStyles from "../../styles/components/ButtonStyles";

const Button = ({
  children,
  onClick = (event) => {},
  primaryColor = "var(--color-primary)",
  secondaryColor = "var(--color-white)",
  styles = {},
  isSmall = false,
}) => {
  const classes = useStyles({ primaryColor, secondaryColor, isSmall });
  return (
    <button style={styles} className={classes.Button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
