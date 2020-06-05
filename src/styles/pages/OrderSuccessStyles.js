import { createUseStyles } from "react-jss";

export default createUseStyles({
  OrderSuccess: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
  },
  OrderSuccess_heading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "5rem",
  },
  OrderSuccess_OrderSummery: {
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
});
