import { createUseStyles } from "react-jss";

export default createUseStyles({
  HeroBanner: {
    gridColumn: "full-start / full-end",

    backgroundImage: (props) => `url(${props.img})`,
    height: "80vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",

    display: "grid",
    gridTemplateColumns: "repeat(5, [col-start] 1fr [col-end])",
    alignItems: "center",
  },

  Content: {
    gridColumn: "col-start 2 / col-end 4",
  },

  subHeading: {
    fontFamily: "var(--font-family-secondary)",
    fontSize: "2rem",
    fontWeight: 300,
    color: "black",
  },
  mainHeading: {
    fontFamily: "var(--font-family-secondary)",
    fontSize: "8rem",
    fontWeight: 700,
    lineHeight: "1.2",
    color: "#90708C",
    marginBottom: "3rem",
  },
});
