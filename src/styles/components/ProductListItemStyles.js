import { createUseStyles } from "react-jss";
import {
  PRODUCT_LIST_ITEM_HEIGHT,
  PRODUCT_LIST_ITEM_IMG_HEIGHT,
} from "../../consts";

export default createUseStyles({
  ProductListItem: {
    width: "100%",
    height: PRODUCT_LIST_ITEM_HEIGHT,
    backgroundColor: "#fff5fe",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.2s 0.2s ease-in-out",

    "&::after": {
      content: '""',
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      transform: "scaleY(0)",
      transformOrigin: "50% 50%",
      zIndex: "-1",
      backgroundColor: "#fcd9f8",
      transition: "transform 0.2s ease-in-out",
    },

    "&:hover:after": {
      transform: "scaleY(1)",
    },

    "&:hover": {
      transform: "translateY(-3px) scale(1.005)",
      boxShadow: "var(--box-shadow-primary)",
    },
  },
  Item_img: {
    width: "100%",
    height: PRODUCT_LIST_ITEM_IMG_HEIGHT,
    backgroundImage: (props) => `url(${props.img})`,
    backgroundSize: "cover",
    position: "relative",
  },

  Item_ratings: {
    position: "absolute",
    left: 0,
    bottom: 0,
    fontSize: "1.5rem",
    fontWeight: 500,
    color: "#fff",
    padding: "0.5rem 1rem",
  },
  Item_content: {
    padding: "0.5rem",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr min-content",
    height: `calc(${PRODUCT_LIST_ITEM_HEIGHT} - ${PRODUCT_LIST_ITEM_IMG_HEIGHT})`,
  },
  Item_details: {
    display: "flex",
    flexDirection: "column",
    alignItem: "flex-start",
  },
  Item_name: {
    // fontFamily: "var(--font-family-secondary)",
    fontSize: "2rem",
    fontWeight: 500,
    marginBottom: "auto",
  },
  Item_category: {
    fontSize: "1.2rem",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  Item_price: {
    fontSize: "2.5rem",
    // fontFamily: "var(--font-family-secondary)",
    fontWeight: "300",
    textTransform: "uppercase",
  },
  Item_btnSet: {
    display: "grid",
    gridTemplateColumns: "1fr min-content",
    gap: "2rem",
    alignItems: "center",
    marginTop: "1rem",
  },

  Item_favoriteBtn: {
    fill: "rgba(144, 112, 140, 1)",
    width: "2rem",
    height: "2rem",
    marginRight: "1rem",
    cursor: "pointer",
    transition: "all 0.2s ease-out",

    "&:hover": {
      transform: "scale(1.1)",
      fill: "#3c2858",
    },
  },
});
