import { createUseStyles } from "react-jss";

export default createUseStyles({
  OrderListStyle: {
    width: "100%",
    minWidth: "60rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "2rem",
    boxShadow: "0 2px 4px rgba(138,149,158,0.5)",
  },
  OrderNumber: {
    fontSize: "1.5rem",
    fontWeight: "400",
    color: "var(--color-primary)",
  },
  Price: {
    fontSize: "2rem",
    fontWeight: "500",
  },
  BtnGroup: {
    display: "flex",
    alignItems: "center",

    "& > *:not(:last-child)": {
      marginRight: "1rem",
    },
  },
});
