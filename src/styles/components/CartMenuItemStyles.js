import { createUseStyles } from "react-jss";

export default createUseStyles({
  CartMenuItem: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "min-content 1fr",
    gap: "2rem",
    padding: "2rem 0",
    borderBottom: "1px solid rgba(3,3,3,0.3)",
  },
  CartMenuItem_img: {
    width: "10rem",
  },
  CartMenuItem_details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  CartMenuItem_name: {
    fontSize: "1.8rem",
    textTransform: "uppercase",
  },
  CartMenuItem_price: {
    fontSize: "1.5rem",
    fontWeight: 700,
  },
});
