import { createUseStyles } from "react-jss";

export default createUseStyles({
  TabButton: {
    fontSize: (props) => (props.isSmall ? "1.4rem" : "2rem"),
    fontWeight: (props) => (props.isActive ? 700 : 500),
    textTransform: "uppercase",
    padding: "2rem 3rem",
    border: "none",
    backgroundImage:
      "linear-gradient(120deg, var(--color-white) 0%, var(--color-white) 50%, var(--color-primary-light) 50%)",
    backgroundSize: "230%",
    color: "var(--color-primary)",
    textAlign: "left",

    outline: "none",
    cursor: "pointer",

    transition: "all 0.2s ease-out",

    "&:hover": {
      backgroundPosition: "100%",
      color: "$color-primary",
      paddingLeft: "4rem",
    },
  },
});
