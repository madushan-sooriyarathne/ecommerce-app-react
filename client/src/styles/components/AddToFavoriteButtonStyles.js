import { createUseStyles } from "react-jss";

export default createUseStyles({
  AddToFavoriteButton: {
    width: "3rem",
    height: "3rem",
    fill: "var(--color-primary)",
    transition: "transform 0.2 ease-out",
    cursor: "pointer",

    "&:hover": {
      transform: "scale(1.05)",
    },
  },
});
