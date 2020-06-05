import { createUseStyles } from "react-jss";

export default createUseStyles({
  Checkout: {
    margin: "5rem 0",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  Checkout_container: {
    width: "100rem",
    display: "grid",
    gridTemplateColumns: "1fr 30rem",
    gap: "5rem",
  },
  Checkout_form: {
    "& > *:not(:last-child)": {
      marginBottom: "3rem",
    },
  },
  Form_heading: {
    fontSize: "2rem",
    fontWeight: "300",
    textTransform: "uppercase",
    marginBottom: "1.5rem",
  },

  Checkout_summery: {
    display: "flex",
    flexDirection: "column",

    "& > *:not(:last-child)": {
      marginBottom: "2rem",
    },
  },
  Form_wrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
  },

  Summery_table: {
    width: "100%",
  },

  Summery_table_const: {
    "& th": {
      padding: "0.5rem 1rem",
      fontSize: "1.4rem",
      borderBottom: "1px solid rgba(196, 196, 196, 0.5)",
    },
  },

  row_heading: {
    fontWeight: "500",
    textAlign: "left",
    textTransform: "uppercase",
  },

  row_heading_right: {
    textAlign: "right",
  },

  row_amount: {
    fontWeight: "300",
    textAlign: "right",
  },

  Summery_couponForm: {
    display: "grid",
    gridTemplateColumns: "1fr min-content",
    gap: "1rem",
  },
});
