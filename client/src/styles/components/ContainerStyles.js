import { createUseStyles } from "react-jss";

export default createUseStyles({
  Container: {
    padding: "10rem",
    backgroundColor: "var(--color-primary-light)",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& > *:not(:last-child)": {
      marginBottom: "3rem",
    },
  },
});
