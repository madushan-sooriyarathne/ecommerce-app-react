import { createUseStyles } from "react-jss";

export default createUseStyles({
  CartItem: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "min-content 1fr",
    gap: "1rem  ",
    padding: "3rem 0 2rem 0",
    borderBottom: "1px solid rgba(0,0,0, 0.3)",
  },
  CartItem_img: {
    width: "15rem",
  },
  CartItem_details: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
  },
  Details_main: {
    display: "grid",
    gridTemplateColumns: (props) =>
      props.isPurchased
        ? "50% 1fr minmax(15rem, 1fr)"
        : "50% 1fr 1fr minmax(15rem, 1fr)",
    alignItems: "center",
    borderBottom: "1px solid rgba(0,0,0, 0.1)",
    padding: "0 0 1rem 0",
  },
  Details_main_name: {
    fontSize: "1.7rem",
    fontWeight: 500,
  },

  Details_main_price_with_qtc: {
    fontSize: "1.7rem",
    fontWeight: "200",
    fontFamily: "var(--font-family-primary)",
  },

  price_bold: {
    fontWeight: "700",
  },
  qtc_bold: {
    fontWeight: "500",
  },

  Details_main_price: {
    fontSize: "1.7rem",
    fontWeight: 700,
  },
  Details_main_qtc: {
    display: "grid",
    gridTemplateColumns: "repeat(3, max-content)",
    alignItems: "center",
    gap: "1rem",
  },
  Qtc_btn: {
    width: "3rem",
    height: "3rem",
    padding: "1rem",
    borderRadius: 3,
    cursor: "pointer",
  },

  Qtc_btn_minus: {
    fill: "var(--color-white)",
    backgroundColor: "red",
    transition: "all 0.2s ease",
    border: "2px solid red",

    "&:hover": {
      fill: "red",
      backgroundColor: "transparent",
    },
  },
  Qtc_btn_add: {
    fill: "var(--color-white)",
    backgroundColor: "var(--color-primary-medium)",
    transition: "all 0.2s ease",
    border: "2px solid var(--color-primary-medium)",

    "&:hover": {
      fill: "var(--color-primary-medium)",
      backgroundColor: "transparent",
    },
  },

  Qtc_btn_disabled: {
    cursor: "not-allowed",
    fill: "black",
    backgroundColor: "gray",
    border: "2px solid gray",

    "&:hover": {
      fill: "black",
      backgroundColor: "gray",
    },
  },

  Details_main_qtc_amount: {
    fontSize: "1.7rem",
    color: "var(--color-primary)",
  },
  Details_main_total: {
    fontSize: "3rem",
    fontWeight: "300",
    justifySelf: "end",
  },
  Details_sub: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 0",
  },
  Details_item_preference: {
    fontSize: "1.5rem",
    color: "var(--color-primary)",
  },
  Details_remove_btn: {
    width: "3rem",
    height: "3rem",
    fill: "var(--color-primary)",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",

    "&:hover": {
      fill: "var(--color-primary-medium)",
      transform: "scale(1.2)",
    },
  },
});
