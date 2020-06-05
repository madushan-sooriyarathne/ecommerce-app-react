import { createUseStyles } from "react-jss";

export default createUseStyles({
  App: {
    minHeight: "100vh",
    overflowX: "hidden",
    position: "relative",
    padding: "10vh 0 0 0",
    boxSizing: "inherit",
  },

  Element_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
