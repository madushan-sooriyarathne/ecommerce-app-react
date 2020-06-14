import { createUseStyles } from "react-jss";

export default createUseStyles({
  Order: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
  },
  Order_heading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "5rem",
  },
  Order_OrderSummery: {
    backgroundColor: "#FCF4FB",
    padding: "5rem",
    width: "100rem",
    display: "flex",
    flexDirection: "column",
  },

  OrderSummery_heading: {
    display: "flex",
    alignItems: "center",
  },

  OrderSummery_orderNumber: {
    fontSize: "1.8rem",
    fontWeight: "300",
  },

  OrderSummery_itemList: {
    marginBottom: "2rem",
  },

  OrderSummery_details: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-end",
    width: "50%",
    marginBottom: "5rem",
  },
  Details_row: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 50%)",
    alignItems: "center",
    marginBottom: "1rem",
  },

  Row_title: {
    fontSize: "1.5rem",
    fontWeight: "400",
    color: "var(--color-primary)",
    justifySelf: "start",
  },
  Row_value: {
    fontSize: "1.7rem",
    fontWeight: "500",
    color: "var(--color-primary)",
    justifySelf: "end",
  },

  Title_bold: {
    fontSize: "2rem",
  },

  Value_bold: {
    fontSize: "2.5rem",
    fontWeight: "700",
  },

  OrderSummery_buttonSet: {
    display: "flex",
    justifyContent: "flex-end",

    "& > *:not(:last-child)": {
      marginRight: "1rem",
    },
  },
  Container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
