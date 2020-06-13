import { createUseStyles } from "react-jss";

export default createUseStyles({
  SearchResultItem: {
    display: "grid",
    gridTemplateColumns: "min-content 1fr",
    gap: "1rem",
    padding: "1rem",
    transition: "background-color 0.2s ease-out",

    "&:hover": {
      backgroundColor: "var(--color-primary-light)",
    },
  },
  SearchResultItem_Image: {
    width: "5rem",
  },
  SearchResultItem_details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  Details_name: {
    fontSize: "2rem",
    fontWeight: "400",
    marginBottom: "1rem",
  },
  Details_price: {
    fontSize: "1.5rem",
    fontWeight: "500",
  },
});
