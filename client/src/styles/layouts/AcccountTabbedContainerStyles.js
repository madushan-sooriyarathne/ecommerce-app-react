import { createUseStyles } from "react-jss";

export default createUseStyles({
  AccountTabbedContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",

    "& > *:first-child": {
      marginBottom: "1rem",
    },
  },

  AccountTabbedContainer_buttons: {
    marginBottom: "3rem",

    display: "flex",

    "& > *:not(:last-child)": {
      marginRight: "1rem",
    },
  },

  Content: {
    "& > *": {
      marginBottom: "2rem",
    },
  },
});
