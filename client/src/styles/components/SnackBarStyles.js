import { createUseStyles } from "react-jss";

export default createUseStyles({
  SnackBar: {
    display: "flex",
    alignItems: "center",
    padding: "2rem",
    backgroundColor: "var(--color-primary)",
    borderRadius: "5px",
  },
  SnackBar_message: {
    fontSize: "1.6rem",
    fontWeight: "500",
    color: "var(--color-white)",
  },
  SnackBar_closeButton: {
    fill: "var(--color-primary)",
    height: "3rem",
    width: "3rem",
    padding: "1rem",
    position: "relative",
    overflow: "hidden",
    border: "none",
    borderRadius: "50%",
    backgroundColor: "transparent",
    outline: "none",

    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      backgroundColor: "gray",
      transform: "scale(0)",
      transformOrigin: "50% 50%",
      transition: "transform 0.4s ease-in-out",
    },

    "&:hover:after": {
      transform: "scale(1.4)",
      opacity: "0.2",
    },
  },
});
