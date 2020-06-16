import { createUseStyles } from "react-jss";

export default createUseStyles({
  FormField: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  FormField_input: {
    fontSize: "1.5rem",
    padding: "1rem",
    backgroundColor: "transparent",
    border: (props) =>
      props.isDisabled ? "1px solid gray" : "1px solid var(--color-primary)",
    // minWidth: "50rem",
    width: "100%",
    height: "100%",
    color: "var(--color-primary)",
    outline: "none",

    "&:placeholder-shown + $FormField_label": {
      transform: "translateY(-4rem)",
      visibility: "hidden",
      opacity: 0,
    },
  },

  FormField_label: {
    fontSize: "1.2rem",
    fontWeight: "500",
    padding: "0.2rem 1rem 0.5rem 1rem",
    marginLeft: "2px",
    transform: "translateY(0)",
    visibility: "visible",
    opacity: 1,
    transition: "all 0.2s ease-in-out",
    color: "var(--color-primary)",
    marginBottom: "0.5rem",
  },
});
