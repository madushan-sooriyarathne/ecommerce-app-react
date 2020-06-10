import { createUseStyles } from "react-jss";

export default createUseStyles({
  AddToFavoriteButton: {
    width: (props) => (props.isSmall ? "2rem" : "3rem"),
    height: (props) => (props.isSmall ? "2rem" : "3rem"),
    fill: "var(--color-primary)",
    transition: "transform 0.2 ease-out",
    cursor: "pointer",

    "&:hover": {
      transform: (props) => (props.isSmall ? "scale(1.1)" : "scale(1.05)"),
    },
  },
});
