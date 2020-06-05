import { createUseStyles } from "react-jss";

export default createUseStyles({
  Shop: {
    display: "grid",
    gridTemplateColumns:
      "[full-start] 15rem [mid-start] 1fr [mid-end] 15rem [full-end]",
    gap: "5rem",
  },
});
