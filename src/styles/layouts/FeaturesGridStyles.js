import { createUseStyles } from "react-jss";

export default createUseStyles({
  FeatureGrid: {
    gridColumn: "mid-start / mid-end",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "4rem",
    margin: "4rem 0",
  },
});
