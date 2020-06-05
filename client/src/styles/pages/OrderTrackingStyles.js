import { createUseStyles } from "react-jss";

export default createUseStyles({
  OrderTracking: {
    width: "100rem",
  },
  OrderTracking_heading: {
    display: "flex",
    marginBottom: "5rem ",
  },

  OrderTracking_detailsTable: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "5rem",

    "& > *:not(:last-child)": {
      marginBottom: "1rem",
    },
  },

  DetailsTable_row: {
    display: "grid",
    gridTemplateColumns: "minmax(25rem, max-content) 1fr",
  },

  Row_key: {
    fontSize: "1.7rem",
    fontWeight: "500",
  },

  Row_value: {
    fontSize: "1.7rem",
    fontWeight: "400",
  },

  OrderTracking_Status: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "7rem",
  },
  Status_box: {
    width: "18rem",
    height: "22rem",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "minmax(14rem, min-content) min-content 1fr",
    gap: "1rem",
    alignItems: "end",
    justifyItems: "center",
    opacity: "0.3",
  },
  Status_box_show: {
    opacity: "1",
  },
  Status_box_img: {
    width: "17rem",
  },

  Status_box_heading: {
    fontSize: "1.8rem",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  Status_box_description: {
    fontSize: "1.5rem",
    fontWeight: "400",
    textAlign: "center",
  },
  OrderTracking_Buttons: {
    display: "flex",
    justifyContent: "flex-end",

    "& > *:not(:last-child)": {
      marginRight: "1rem",
    },
  },
});
