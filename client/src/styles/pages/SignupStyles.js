import { createUseStyles } from "react-jss";
import { lightenDarkenColor } from "../../helpers";

export default createUseStyles({
  External_Signups: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    alignSelf: "center",

    "& > *:not(:last-child)": {
      marginRight: "5rem",
    },
  },
  Signup_separator: {
    fontSize: "2rem",
    fontWeight: 500,
    textTransform: "uppercase",
    alignSelf: "center",
  },

  RedirectLinks: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",

    "& a": {
      fontSize: "1.4rem",
      color: "var(--color-primary)",
      textDecoration: "none",
      transition: "all 0.2s ease-in-out",
      marginBottom: "0.5rem",

      "&:hover": {
        color: lightenDarkenColor("var(--color-primary)", 50),
        textDecoration: "underline",
      },
    },
  },
});
