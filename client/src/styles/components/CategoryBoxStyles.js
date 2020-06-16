import { createUseStyles } from "react-jss";

export default createUseStyles({
  CategoryBox: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",

    "&:hover > $BackgroundImageHolder": {
      transform: "scale(1.1)",
    },
  },

  BackgroundImageHolder: {
    backgroundImage: (props) => `url(${props.img})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
    transition: "transform 0.3s ease-out",
  },

  Btn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "2rem",
    fontWeight: 500,
    textTransform: "uppercase",
    padding: "2rem 4rem",
    border: "2px solid var(--color-white)",
    backgroundColor: "rgba(225,225,225,0.3  )",
    color: "var(--color-white)",

    outline: "none",
    cursor: "pointer",

    transition: "all 0.2s ease-out",

    "&:hover": {
      color: "var(--color-primary)",
      backgroundColor: "var(--color-white)",
    },
  },
});
