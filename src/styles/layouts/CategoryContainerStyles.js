import { createUseStyles } from "react-jss";

export default createUseStyles({
  CategoryContainer: {
    gridColumn: "full-start / full-end",

    width: "100%",
    height: "50rem",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "3rem",
  },
});
