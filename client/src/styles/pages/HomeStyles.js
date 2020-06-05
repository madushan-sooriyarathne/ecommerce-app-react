import { createUseStyles } from "react-jss";

export default createUseStyles({
  Home: {
    width: "100%",
    height: "100%",
    minHeight: "100%",

    display: "grid",
    gridTemplateColumns:
      "[full-start] 20rem [mid-start] 1fr [mid-end] 20rem [full-end]",
    gap: "3rem",
  },
});
