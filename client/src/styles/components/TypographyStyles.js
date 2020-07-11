import { createUseStyles } from "react-jss";

export default createUseStyles({
  HeadingPrimary: {
    color: "var(--color-primary)",
    fontFamily: "var(--font-family-secondary)",
    fontSize: "4rem",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },

  HeadingSecondary: {
    color: "var(--color-primary)",
    fontFamily: "var(--font-family-secondary)",
    fontSize: "2rem",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  HeadingTertiary: {
    color: "var(--color-primary)",
    fontFamily: "var(--font-family-secondary)",
    fontSize: "1.8rem",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  HeadingPrimary_slim: {
    color: "var(--color-primary)",
    fontSize: "3rem",
    fontWeight: 300,
    letterSpacing: "2px",
  },
  HeadingSecondary_slim: {
    color: "var(--color-primary)",
    fontSize: "2rem",
    fontWeight: 300,
    letterSpacing: "2px",
  },
});
