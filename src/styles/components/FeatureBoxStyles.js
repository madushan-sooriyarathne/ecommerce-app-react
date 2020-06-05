import { createUseStyles } from "react-jss";

export default createUseStyles({
  FeatureBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "var(--box-shadow-primary)",
    padding: "3rem",
    transform: "translateY(0)",
    transition: "transform 0.3s ease-in-out",

    "&:hover": {
      transform: "translateY(-0.5rem)",
    },

    "&:hover > $FeatureBox_title": {
      color: "rgba(99, 83, 128, 1)",
    },
  },
  FeatureBox_img: {
    width: "25rem",
    height: "20rem",
    marginBottom: "2rem",
  },
  FeatureBox_title: {
    // fontFamily: "var(--font-family-secondary)",
    fontSize: "2rem",
    fontWeight: 500,
    textTransform: "uppercase",
    marginBottom: "1rem",
    transition: "color 0.2s ease-in-out",
  },
  FeatureBox_description: {
    fontSize: "1.4rem",
    color: "gray",
    textAlign: "center",
  },
});
