import { createUseStyles } from "react-jss";

export default createUseStyles({
  AccountTabbedContainer: {
    display: "flex",
    flexDirection: "column",

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
    alignSelf: "flex-start",
    width: "100%",
    display: "flex",
    flexDirection: "column",

    "& > *": {
      marginBottom: "4rem",
    },
  },
});
