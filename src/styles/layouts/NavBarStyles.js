import { createUseStyles } from "react-jss";
import { NAV_BAR_MIN_HEIGHT } from "../../consts";

export default createUseStyles({
  NavBar: {
    display: "grid",
    gridTemplateColumns: "1fr min-content 1fr",
    alignItems: "center",
    justifyItems: "start",
    height: "10%",
    width: "100%",
    minHeight: NAV_BAR_MIN_HEIGHT,
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: 100,
    padding: "0 5rem",
    backgroundColor: "#f6eafa",
  },

  NavBar_menu_btn: {
    width: "3.5rem",
    height: "3.5rem",
    fill: "var(--color-primary)",
    cursor: "pointer",
  },

  NavBar_user_auth_details: {
    height: "15rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  NavBar_centered_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",

    "& > *:not(:last-child)": {
      marginRight: "2rem",
    },
  },

  NavBar_loading_text: {
    fontSize: "1.4rem",
    color: "var(--color-primary)",
  },
  NavBar_nav_menu: {
    display: "flex",
    flexDirection: "column",
  },
  NavBar_search_and_cart: {
    justifySelf: "end",
    display: "grid",
    gridTemplateColumns: "1fr min-content",
    alignItems: "end",
  },
  search: {
    display: "grid",
    gridTemplateColumns: "30rem min-content 1fr",
  },
  Search_field: {
    width: "100%",
    fontSize: "1.4rem",
    padding: "1rem",
    border: "2px solid #3c2858",
    backgroundColor: "transparent",
    color: "#3c2858",
  },
  Search_btn: {
    width: "4rem",
    height: "4rem",
    fill: "#fff",
    backgroundColor: "#3c2858",
  },
  NavBar_logo: {
    justifySelf: "center",

    "& h1": {
      fontSize: "4rem",
      fontFamily: "var(--font-family-secondary)",
      textTransform: "uppercase",
      color: "#3c2858",
    },
  },

  NavLinks_selected: {
    "& > *": {
      fontWeight: 700,
    },
  },

  NavButtons: {
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: "2rem",
    },
  },
});
