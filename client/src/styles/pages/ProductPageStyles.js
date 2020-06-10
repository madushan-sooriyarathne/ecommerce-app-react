import { createUseStyles } from "react-jss";

export default createUseStyles({
  ProductPage: {
    width: "80%",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "5rem",
  },
  ProductPage_images: {
    minHeight: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "2rem",
  },

  Img_box: {
    height: "50rem",
    // width: "100%",
  },

  ProductPage_details: {
    height: "100%",

    "& > *:not(:last-child)": {
      marginBottom: "6rem",
    },
  },

  Details_basic: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "90%",
  },

  Details_category_tag: {
    fontSize: "1.8rem",
    fontWeight: "500",
    textTransform: "uppercase",
    color: "var(--color-primary-medium)",
  },

  Details_price_tag: {
    fontSize: "3rem",
    fontWeight: "400",
    color: "var(--color-primary)",
    marginTop: "1rem",
  },

  Details_selections: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  Selection_group: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  Selection_label: {
    fontSize: "1.4rem",
    fontWeight: "500",
    color: "var(--color-primary)",
    marginBottom: "1rem",
  },

  Selection_box_array: {
    width: "90%",
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "3rem",
  },

  Selection_box: {
    minWidth: "6rem",
    height: "4rem",
    padding: "0 1rem",
    borderRadius: "3px",
    backgroundColor: "transparent",
    color: "var(--color-primary)",
    border: "2px solid var(--color-primary)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
    fontSize: "1.5rem",
    fontWeight: "500",
    transform: "scale(1)",
    transition: "transform 0.2s ease-in-out",
    cursor: "pointer",
    marginRight: "1rem",

    "&:hover": {
      transform: "scale(1.1 )",
    },
  },

  Selection_box_active: {
    transition: "all 0.2s ease-out",
    backgroundColor: "var(--color-primary)",
    color: "var(--color-white)",
  },

  Btn_group: {
    display: "grid",
    gridTemplateColumns: "1fr min-content",
    gap: "3rem",
    alignItems: "center",
    width: "70%",
  },

  Details_description: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",

    "& > li": {
      fontSize: "1.5rem",
      fontWeight: "500",
      color: "var(--color-primary)",
      marginLeft: "1.5rem",
      marginBottom: "0.5rem",

      "&::before": {
        content: parseInt("2022", 8),
        color: "var(--color-primary)",
        width: "1rem",
      },
    },
  },

  Details_note: {
    width: "80%",
    border: "2px solid var(--color-primary)",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  Note_title: {
    fontSize: "2rem",
    textTransform: "uppercase",
    fontWeight: "500",
    color: "var(--color-primary)",
    marginBottom: "1rem",
  },

  Note_description: {
    textAlign: "justify",
    hyphens: "auto",
    fontSize: "1.5rem",
    fontWeight: "500",
    color: "var(--color-primary)",
  },
});
