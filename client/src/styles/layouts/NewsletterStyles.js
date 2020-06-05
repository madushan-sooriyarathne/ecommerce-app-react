import { createUseStyles } from "react-jss";

export default createUseStyles({
  Newsletter: {
    gridColumn: "full-start / full-end",

    height: "30rem",
    width: "100%",
    backgroundColor: "var(--color-primary-light)",
    padding: "5rem 0rem",
    display: "grid",
    gridTemplateColumns:
      "1fr [content-start] minmax(60rem, min-content) [content-end] 1fr",
    alignContent: "center",
    justifyContent: "center",
  },
  Newsletter_message: {
    gridColumn: "content-start / content-end",
    justifySelf: "center",
    fontSize: "2rem",
    fontWeight: 500,
    color: "var(--color-primary)",
  },
  Newsletter_input: {
    gridColumn: "content-start / content-end",
    display: "grid",
    gridTemplateColumns: "1fr min-content",
    alignItems: "stretch",
    margin: "3rem 0",
  },
  Newsletter_status_message: {},
});
