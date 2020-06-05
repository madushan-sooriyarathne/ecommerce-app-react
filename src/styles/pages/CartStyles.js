import { createUseStyles } from "react-jss";

export default createUseStyles({
  Cart: {
    display: "grid",
    gridTemplateColumns: "minmax(70rem, 100rem) max-content",
    gap: "5rem",
  },

  Cart_empty: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",

    "& > *:not(:last-child)": {
      marginBottom: "2rem",
    },
  },
  Cart_empty_img: {
    width: "40rem",
    height: "40rem",
    alignSelf: "center",
  },
  Cart_empty_message: {
    fontSize: "3rem",
    fontWeight: 300,
    color: "red",
  },

  ProductList_header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  ProductList_items: {
    display: "flex",
    flexDirection: "column",
  },

  Cart_summery: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "30rem",

    "& > *": {
      marginBottom: "2rem",
    },
  },

  Details_row: {
    marginBottom: "1rem",
    display: "grid",
    minWidth: "20rem",
    gridTemplateColumns: "1fr max-content",
    gap: "1rem",
  },
  Details_heading: {
    fontSize: "1.5rem",
    fontWeight: 500,
  },
  Details_value: {
    fontSize: "1.6rem",
    fontWeight: 300,
    textAlign: "right",
  },
  Details_total: {
    fontSize: "3rem",
    fontWeight: "500",
    textAlign: "right",
  },

  Cart_summery_note: {
    fontSize: "1.5rem",
    color: "gray",
    textAlign: "center",
  },
});
