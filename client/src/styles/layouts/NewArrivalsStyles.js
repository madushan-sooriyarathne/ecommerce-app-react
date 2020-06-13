import { createUseStyles } from "react-jss";

export default createUseStyles({
  NewArrivals: {
    gridColumn: "mid-start / mid-end",
    marginTop: "5rem",
    minHeight: "60rem",

    display: "grid",
    gridTemplateRows: "max-content 1fr",
    gap: "3rem",
  },

  Header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 10rem",
  },

  Header_title: {
    fontSize: "5rem",
    fontWeight: 700,
    textTransform: "uppercase",
  },

  Header_btnSet: {},

  filterBtn: {
    fontSize: "1.5rem",
    fontWeight: 500,
    padding: "1rem 2rem",
    border: "none",
    backgroundColor: "transparent",
    color: "var(--color-primary)",

    outline: "none",
    cursor: "pointer",

    transition: "background-color 0.2s ease-out",

    "&:hover": {
      backgroundColor: "var(--color-primary-light)",
    },
  },

  filterBtn_selected: {
    backgroundColor: "var(--color-primary-light)",
  },

  NewArrivals_content: {
    width: "100%",
    height: "100%",
  },

  Empty: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  Empty_img: {
    width: "30rem",
    height: "30rem",
    marginBottom: "3rem",
  },

  Loading: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
