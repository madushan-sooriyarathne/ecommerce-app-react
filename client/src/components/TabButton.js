import React from "react";
import useStyles from "../styles/components/TabButtonStyles";

const TabButton = ({
  children,
  isActive = true,
  isSmall = true,
  styles = {},
  onClick = () => {},
  id = "",
}) => {
  const classes = useStyles({ isActive, isSmall });

  return (
    <button
      data-id={id}
      className={`${classes.TabButton} tab-btn`}
      style={styles}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TabButton;
