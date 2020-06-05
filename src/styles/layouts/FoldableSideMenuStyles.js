import { createUseStyles } from "react-jss";

export default createUseStyles({
  FoldableSideMenu: {
    display: "flex",
    visibility: "hidden",
    opacity: 0,
    flexDirection: "column",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 100,
  },

  FoldableSideMenu_open: {
    transition: "opacity 0.3s ease-in-out",
    visibility: "visible",
    opacity: "1",
  },

  FoldableSideMenu_sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    transform: "translateX(-100%)",
    minWidth: "40rem",
    padding: "5rem 0",
    backgroundColor: "var(--color-white)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s ease-in-out",
    willChange: "transform",
    zIndex: 200,
  },
  FoldableSideMenu_sidebar_open: {
    transition: "transform 0.2s ease-in-out",
    transform: "translateX(0)",
    willChange: "transform",
  },

  FoldableSideMenu_sidebar_close_btn: {
    position: "absolute",
    top: 20,
    right: 20,
    width: "2.5rem",
    height: "2.5rem",
    fill: "var(--color-primary)",
    cursor: "pointer",
    transition: "all 0.2s ease-in",
    display: "inline-block",

    "&:hover": {
      transform: "scale(1.2)",
      fill: "var(--color-primary-medium)",
    },
  },
});
