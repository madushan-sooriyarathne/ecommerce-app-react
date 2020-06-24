import { createUseStyles } from "react-jss";

export default createUseStyles({
  AboutPage_ProjectAbout: {
    width: "100%",
    padding: "0 10rem",
    minHeight: "60rem",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "5rem",
    justifyItems: "center",
    marginBottom: "10rem",
  },
  ProjectAbout_Image_cover: {
    width: "100%",
    height: "100%",
    backgroundImage: (props) => `url(${props.img})`,
    backgroundSize: "cover",
  },
  ProjectAbout_Details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  Details_paragraph: {
    fontSize: "1.8rem",
    fontWeight: "400",
    color: "var(--color-primary)",
    textAlign: "justify",
    hyphens: "auto",
  },
  AboutPage_Contact: {
    width: "100%",
    padding: "0 10rem",
    // minHeight: "60rem",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "2rem",
    justifyItems: "center",
  },
  Contact_Form: {
    justifySelf: "stretch",
    padding: "5rem 5rem",
  },
  Contact_Details: {
    justifySelf: "stretch",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  Details_group: {
    width: "100%",
    padding: "5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  Details_item: {
    width: "50%",
    display: "grid",
    gridTemplateColumns: "min-content 1fr",
    gap: "4rem",
    alignItems: "center",
    marginBottom: "2rem",
  },
  Details_icon: {
    fill: "var(--color-primary)",
    width: "4rem",
    height: "4rem",
  },
  Details_data: {
    fontSize: "1.8rem",
    fontWeight: "500",
    color: "var(--color-primary)",
  },
});
