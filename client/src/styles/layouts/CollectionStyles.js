import { createUseStyles } from "react-jss";

export default createUseStyles({
  Collection: {
    gridColumn: "mid-start / mid-end",
    margin: "5rem 0",
  },
  Collection_header: {
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
    padding: "0 3rem",
  },
  Heading_btn: {
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "rgba(99, 83, 128, 1)",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    cursor: "pointer",
    transition: "color 0.2s ease-out",

    "&:hover": {
      color: "#3c2858",
    },

    "&:hover  $arrow": {
      transform: "translateX(1rem)",
    },
  },

  arrow: {
    display: "inline-block",
    transform: "translateX(0)",
    transition: "transform 0.2s ease-out",
  },
});
