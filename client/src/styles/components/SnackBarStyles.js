import { createUseStyles } from "react-jss";

export default createUseStyles({
  SnackBar: {
    position: "fixed",
    bottom: "2%",
    left: "2%",
    transform: "translateY(100%)",
    minWidth: "20rem",
    display: "grid",
    gridTemplateColumns: "minmax(max-content, 1fr) min-content",
    gap: "2rem",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "var(--color-primary)",
    borderRadius: "5px",
    visibility: "hidden",
    opacity: "0",
    zIndex: "1000",
  },

  SnackBar_show: {
    visibility: "visible",
    opacity: "1",
    transform: "translateY(0)",
    transition: "all 0.2s ease-in-out",
  },
  SnackBar_message: {
    fontSize: "1.6rem",
    fontWeight: "500",
    color: "var(--color-white)",
  },
  SnackBar_closeButton: {
    padding: "1rem",
    width: "4rem",
    height: "4rem",
    display: "felx",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    border: "none",
    borderRadius: "50%",
    backgroundColor: "transparent",
    outline: "none",

    "& svg": {
      fill: "var(--color-white)",
      height: "1rem",
      width: "1rem",
    },

    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      backgroundColor: "var(--color-white)",
      transform: "scale(0)",
      transformOrigin: "50% 50%",
      transition: "all 0.4s ease-in-out",
      zIndex: "-10",
    },

    "&:hover:after": {
      transform: "scale(1.4)",
      opacity: "0.3",
    },
  },
});
