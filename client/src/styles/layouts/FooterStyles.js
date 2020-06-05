import { createUseStyles } from "react-jss";
import { FOOTER_MIN_HEIGHT } from "../../consts";

export default createUseStyles({
  Footer: {
    // position: "sticky",
    // bottom: 0,
    // left: 0,

    width: "100%",
    minHeight: FOOTER_MIN_HEIGHT,
    zIndex: 10,
    backgroundColor: "#3c2858",
    color: "#fff",

    display: "grid",
    gridTemplateColumns:
      "[footer-start]1fr repeat(3, [col-start] minmax(30rem, min-content) [col-end]) 1fr [footer-end]",
    alignItems: "center",
    gap: "5rem",
    justifyItems: "start",
  },

  category_links: {
    gridColumn: "col-start 1 / col-end 1",
  },
  company_links: {
    gridColumn: "col-start 2 / col-end 2",
  },

  Footer_NavLinks: {},

  NavLinks_title: {
    fontSize: "1.8rem",
    fontFamily: "var(--font-family-secondary)",
    fontWeight: 500,
    textTransform: "uppercase",
    marginBottom: "3rem",
    borderBottom: "2px solid #fff",
  },
  NavLinks_links: {
    display: "flex",
    flexDirection: "column",

    "& > *:not(:last-child)": {
      marginBottom: "1rem",
    },
  },
  Link: {
    fontSize: "1.4rem",
    textDecoration: "none",
    color: "#fff",
  },
});
