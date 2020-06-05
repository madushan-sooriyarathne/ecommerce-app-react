import { createUseStyles } from "react-jss";

export default createUseStyles({
  Category: {
    display: "grid",
    gridTemplateColumns:
      "minmax(5rem, 10rem) [start] 1fr [end] minmax(5rem, 10rem)",
    gap: "5rem",
  },
});
