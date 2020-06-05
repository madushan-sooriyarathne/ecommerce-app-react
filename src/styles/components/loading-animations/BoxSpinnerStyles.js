import { createUseStyles } from "react-jss";

export default createUseStyles({
  "@global": {
    "@keyframes pulse": {
      "50%": {
        borderWidth: "20px",
      },
    },

    "@keyframes spin": {
      "100%": {
        transform: "rotate(360deg)",
      },
    },
  },
  BoxSpinner: {
    position: "relative",
    display: "inline-block",
    boxSizing: "border-box",
    padding: "3rem",
  },
  BoxSpinner_box: {
    position: "relative",
    boxSizing: "border-box",
    border: "4px solid var(--color-primary)",
    width: "6rem",
    height: "6rem",
    animation: "spin 3s infinite linear",

    "&:after": {
      content: "''",
      position: "absolute",
      top: "50%",
      left: "50%",
      WebkitTransform: "translate(-50%, -50%)",
      transform: "translate(-50%, -50%)",
      boxSizing: "border-box",
      border: "4px solid var(--color-primary)",
      width: "4rem",
      height: "4rem",
      animation: "pulse 1.5s infinite ease",
    },
  },
});
