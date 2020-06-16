import { createUseStyles } from "react-jss";

export default createUseStyles({
  ExternalAuthLink: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 3rem",
    border: "2px solid var(--color-primary)",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",

    "&:hover": {
      backgroundColor: "var(--color-primary)",
    },

    "&:hover $Vendor_name": {
      color: "var(--color-white)",
    },
  },
  Vendor_logo: {
    width: "4rem",
    height: "4rem",
    marginRight: "2rem",
  },
  Vendor_name: {
    fontSize: "1.8rem",
    fontWeight: 500,
    color: "var(--color-primary)",
    textTransform: "uppercase",
    transition: "color 0.2s ease-in-out",
  },
});
