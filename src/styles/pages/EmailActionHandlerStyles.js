import { createUseStyles } from "react-jss";

export default createUseStyles({
  Error: {
    fontSize: "3rem",
    fontWeight: 300,
    color: "red",
  },

  Success: {
    fontSize: "3rem",
    fontWeight: 300,
    color: "var(--color-primary)",
  },

  Element_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
