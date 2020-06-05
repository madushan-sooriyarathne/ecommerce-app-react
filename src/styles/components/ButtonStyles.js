import { createUseStyles } from "react-jss";
import { lightenDarkenColor } from "../../helpers";

export default createUseStyles({
  Button: {
    fontSize: (props) => (props.isSmall ? "1.4rem" : "2rem"),
    fontWeight: 500,
    letterSpacing: "2px",
    textTransform: "uppercase",
    padding: "1.5rem 2rem",
    border: "none",
    backgroundColor: (props) => props.primaryColor,
    color: (props) => props.secondaryColor,
    outline: "none",
    cursor: "pointer",
  },
  ButtonStatic: {
    transition: "all 0.2s ease-out",

    "&:hover": {
      backgroundColor: (props) => lightenDarkenColor(props.primaryColor, -20),
      transform: "translateY(-2px)",
    },
  },

  ButtonAnimated: {
    border: (props) => `2px solid ${props.primaryColor}`,
    transition: "all 0.2s ease-out",

    "&:hover": {
      color: (props) => props.primaryColor,
      backgroundColor: "transparent",
    },
  },
});
