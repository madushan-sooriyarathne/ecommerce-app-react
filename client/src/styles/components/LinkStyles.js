import { createUseStyles } from "react-jss";

export default createUseStyles({
  Link: {
    textDecoration: "none",
    fontWeight: "500",
    color: "var(--color-primary)",
    fontSize: (props) => props.fontSize,
    position: "relative",
    cursor: "pointer",
    transition: "all 0.2s ease-out",
    display: "inline-block",

    "&:hover": {
      transform: "scale(1.1)",
      color: "var(--color-primary-medium)",
    },

    "&::before": {
      content: '""',
      width: "100%",
      height: "40%",
      position: "absolute",
      top: "60%",
      left: "0",
      backgroundColor: "var(--color-link-bg)",
      zIndex: "-1",
      transform: "rotate(-2deg)",
    },
  },
});
