import { createUseStyles } from "react-jss";
import { FOOTER_MIN_HEIGHT } from "../../consts";

export default createUseStyles({
  Footer: {
    width: "100%",
    minHeight: FOOTER_MIN_HEIGHT,
    zIndex: 10,
    backgroundColor: "var(--color-primary)",
    color: "var(--color-white)",
    padding: "10rem 5rem",

    display: "grid",
    gap: "10rem",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "repeat(2, max-content)",
  },

  Footer_top: {
    gridRow: "1 / 2",
    width: "100%",
    display: "grid",
    gridTemplateColumns:
      "[footer-start]1fr repeat(3, [col-start] minmax(30rem, min-content) [col-end]) 1fr [footer-end]",
    alignItems: "start",
    justifyItems: "start",
  },

  Footer_bottom: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  Footer_copyrights: {
    fontSize: "1.8rem",
    color: "var(--color-white)",
  },

  category_links: {
    gridColumn: "col-start 1 / col-end 1",
  },
  company_links: {
    gridColumn: "col-start 2 / col-end 2",
  },

  social_links: {
    gridColumn: "col-start 3 / col-end 3",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  Footer_NavLinks: {},

  NavLinks_title: {
    fontSize: "1.8rem",
    fontFamily: "var(--font-family-secondary)",
    fontWeight: 500,
    textTransform: "uppercase",
    marginBottom: "3rem",
    borderBottom: "2px solid var(--color-white)",
  },
  NavLinks_links: {
    display: "flex",
    flexDirection: "column",

    "& > *:not(:last-child)": {
      marginBottom: "1rem",
    },
  },
  RouterLink: {
    alignSelf: "flex-start",
    fontSize: "1.8rem",
    textDecoration: "none",
    color: "var(--color-white)",
  },

  Social_media: {
    display: "flex",
    alignItems: "center",

    "& > *:not(:last-child)": {
      marginRight: "3rem",
    },
  },

  Social_button: {
    width: "5rem",
    height: "5rem",
    borderRadius: "50%",
    backgroundColor: "rgba(225, 225, 225, 0.2)",
    border: "2px solid var(--color-white)",
    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    transition: "background-color 0.2s ease-in-out",

    "&:hover": {
      backgroundColor: "var(--color-white)",
    },

    "&:hover $Social_icon": {
      fill: "var(--color-primary)",
    },
  },

  Social_icon: {
    width: "3rem",
    height: "3rem",
    fill: "var(--color-white)",
    transition: "fill 0.2s ease-out",
  },
});
