import { createUseStyles } from "react-jss";

export default createUseStyles({
  "@global": {
    ".StripeElement": {
      fontSize: "1.5rem",
      color: "var(--color-primary)",
      fontFamily: "var(font-family-primary)",
      padding: "1rem 2rem",
      backgroundColor: "var(--color-white)",
      boxShadow:
        "rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px;",
      outline: "none",
      borderRadius: "2px",
    },

    ".StripeElement--focus": {
      boxShadow:
        "rgba(50, 50, 93, 0.109804) 0px 4px 6px, gba(0, 0, 0, 0.0784314) 0px 1px 3px",
      transition: " boxShadow 150ms ease",
    },
  },

  StripeCheckoutForm: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  StripeCheckoutForm_heading: {
    alignSelf: "center",
    marginBottom: "5rem",
  },
  StripeCheckoutForm_form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  StripeCheckoutForm_formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "2rem",

    "& > label": {
      fontSize: "1.5rem",
      color: "var(--color-primary)",
      fontFamily: "var(--font-family-primary)",
      marginBottom: "1rem",
    },
    "& > input": {
      fontSize: "1.5rem",
      padding: "1rem 2rem",
      backgroundColor: "var(--color-white)",
    },

    "& > input:focus": {
      boxShadow:
        "rgba(50, 50, 93, 0.109804) 0px 4px 6px, gba(0, 0, 0, 0.0784314) 0px 1px 3px",
      transition: " boxShadow 150ms ease",
    },
  },
});
