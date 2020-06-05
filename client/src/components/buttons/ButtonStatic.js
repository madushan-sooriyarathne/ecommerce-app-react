import React from "react";

import useStyles from "../../styles/components/ButtonStyles";
import LoadingSpinner from "../loading-animations/LoadingSpinner";

const ButtonStatic = ({
  children,
  onClick = (event) => {},
  primaryColor = "var(--color-primary)",
  secondaryColor = "var(--color-white)",
  type = "",
  styles = {},
  isSmall = false,
  disabled = false,
  loading = false,
}) => {
  const classes = useStyles({ primaryColor, secondaryColor, isSmall });
  return (
    <button
      type={type}
      style={styles}
      className={`${classes.Button} ${classes.ButtonStatic}`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <LoadingSpinner color="var(--color-primary-light)" small={true} />
      ) : (
        children
      )}
    </button>
  );
};

export default ButtonStatic;
