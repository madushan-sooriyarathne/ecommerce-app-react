import { createUseStyles } from "react-jss";

export default createUseStyles({
  Popup: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    visibility: "hidden",
    opacity: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "100",
    pointerEvents: "auto",
  },
  Popup_show: {
    visibility: "visible",
    opacity: 1,
    transition: "opacity 0.2s ease-in-out",
  },

  Popup_Overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backdropFilter: "blur(10px)",
  },
  Popup_Box: {
    position: "relative",
    padding: "10rem 5rem",
    borderRadius: "5px",
    backgroundColor: "var(--color-white)",
    minWidth: "40rem",
    maxWidth: "60rem",
    minHeight: "40rem",
    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
    zIndex: "110",
  },

  Box_close: {
    position: "absolute",
    top: "5%",
    right: "5%",
    width: "2rem",
    height: "2rem",
    fill: "var(--color-primary)",
    display: "block",
    transition: "transform 0.2s ease-out",
    cursor: "pointer",

    "&:hover": {
      transform: "scale(1.1)",
    },
  },
});
