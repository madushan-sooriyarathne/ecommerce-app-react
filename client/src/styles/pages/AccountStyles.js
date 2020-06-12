import { createUseStyles } from "react-jss";

export default createUseStyles({
  Account: {
    // minWidth: "120rem",
    display: "grid",
    gridTemplateColumns: "max-content 1fr",
    // margin: "10rem 40rem",
    justifySelf: "stretch",
  },

  Account_NavButtons: {
    display: "flex",
    flexDirection: "column",
  },

  Account_details: {
    height: "95rem",
    minWidth: "80rem",
    // backgroundColor: "var(--color-primary-light)",
    // border: "1px solid var(--color-primary)",
    padding: "5rem",
  },

  Account_details_overview: {
    display: (props) => (props.activeItem === 0 ? "block" : "none"),
  },

  Account_details_orderHistory: {
    display: (props) => (props.activeItem === 1 ? "block" : "none"),
  },

  Account_details_wishlist: {
    display: (props) => (props.activeItem === 2 ? "block" : "none"),
  },

  Wishlist: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "3rem",
    scrollY: "auto",
  },

  Order_History: {
    display: "flex",
    height: "70rem",
    flexDirection: "column",
    overflowY: "auto",
    padding: "0.5rem",

    "& > *:not(:last-child)": {
      marginBottom: "2rem",
    },
  },

  button_input_field: {
    display: "grid",
    gridTemplateColumns: "60% 40%",
    gap: "3rem",
  },

  inline_button_heading: {
    display: "flex",
    alignItems: "center",
  },

  content_wrapper: {
    "& > *:first-child": {
      marginBottom: "1rem",
    },
  },

  Overview_form: {
    display: "flex",
    flexDirection: "column",

    "& > *:not(:last-child)": {
      marginBottom: "1rem",
    },
  },

  Form_wrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
  },
});
