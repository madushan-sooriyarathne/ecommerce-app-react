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
