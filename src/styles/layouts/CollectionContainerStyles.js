import { createUseStyles } from "react-jss";

export default createUseStyles({
  CollectionContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "5rem",
    alignItems: "stretch",

    marginTop: "3rem",
  },
});
