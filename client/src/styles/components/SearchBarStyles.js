import { createUseStyles } from "react-jss";

export default createUseStyles({
  Search: {
    display: "grid",
    gridTemplateColumns: "30rem min-content 1fr",
    position: "relative",
    zIndex: "10",
    cursor: "pointer",
  },
  Search_field: {
    width: "100%",
    fontSize: "1.4rem",
    padding: "1rem",
    border: "2px solid var(--color-primary)",
    backgroundColor: "transparent",
    color: "var(--color-primary)",

    "&:focus": {
      outlineOffset: 0,
      outline: "none",
    },
  },
  SearchResults: {
    position: "absolute",
    top: "100%",
    left: "0",
    width: "100%",
    boxShadow: "0 2px 4px rgba(138,149,158,0.5)",
    backgroundColor: "var(--color-white)",
    visibility: "hidden",
    opacity: "0",
  },

  SearchResults_show: {
    visibility: "visible",
    opacity: "1",
    transition: "opacity 0.2s ease-out",
  },

  SearchResults_error: {
    height: "10rem",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-error)",
    fontSize: "1.6rem",
    fontWeight: "500",
  },

  Overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "transparent",
    visibility: "hidden",
  },
  Overlay_show: {
    visibility: "visible",
  },
  Search_Btn: {
    outline: "none",
    border: "none",
    cursor: "pointer",
    backgroundColor: "var(--color-primary)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Btn_svg: {
    width: "4rem",
    height: "4rem",
    fill: "var(--color-white)",
  },
});
