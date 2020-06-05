import { createUseStyles } from "react-jss";

export default createUseStyles({
  "@global": {
    "@keyframes push": {
      "50%": {
        left: "56px",
      },
    },
  },
  LoadingBar: {
    // padding: "1rem",
    display: "inline-block",
  },
  LoadingBar_circle: {
    position: "relative",
    boxSizing: "border-box",
    top: "50%",
    borderRadius: "16px",
    width: "8rem",
    height: "2rem",
    padding: "4px",
    background: "var(--color-primary-light)",

    "&:before": {
      content: "''",
      position: "absolute",
      borderRadius: "16px",
      width: "2rem",
      height: "1.2rem",
      left: "0",
      background: "var(--color-primary)",
      animation: "push 1s infinite linear",
    },
  },
});
