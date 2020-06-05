import { createUseStyles } from "react-jss";

export default createUseStyles({
  CartDropDownMenu: {
    position: "relative",

    margin: "0 4rem",
  },
  CartDropDownMenu_number: {
    position: "absolute",
    minWidth: "2.5rem",
    minHeight: "2.5rem",
    bottom: "50%",
    left: "50%",

    fontSize: "1.2rem",
    fontWeight: 700,
    padding: "0.5rem",
    color: "var(--color-white)",
    backgroundColor: "var(--color-primary)",
    borderRadius: "50rem",
    textAlign: "center",
    cursor: "pointer",
  },

  CartDropDownMenu_icon: {
    width: "3rem",
    height: "3rem",
    cursor: "pointer",
  },

  CartDropDownMenu_dropdown_list: {
    position: "absolute",
    top: "120%",
    left: 0,
    transform: "translate(-50%, -50%) scale(0)",
    width: "35rem",
    height: "50rem",
    padding: "2rem",
    boxShadow: "0px 6px 30px 0px rgba(0,0,0,0.1)",
    backgroundColor: "var(--color-white)",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows:
      "[heading-start] min-content [heading-end list-start] 1fr [list-end button-start] min-content [button-end]",

    visibility: "hidden",
    opacity: "none",
    // transition: "opacity 0.1s, transform 0.2s ease-in-out 0.1s",
  },
  CartDropDownMenu_dropdown_list_open: {
    visibility: "visible",
    opacity: "1",
    transform: "translate(-50%, 0) scale(1)",
    transition: "all 0.2s ease-in-out",
    willChange: "transform",
  },

  CartDropDownMenu_empty: {
    gridRow: "list-start / list-end",
    alignSelf: "center",
    justifySelf: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  CartDropDownMenu_empty_img: {
    width: "20rem",
    marginBottom: "4rem",
  },
  CartDropDownMenu_empty_msg: {
    fontSize: "2rem",
    fontWeight: 500,
    color: "red",
    textAlign: "center",
  },

  CartDropDownMenu_items: {
    marginBottom: "2rem",
    height: "35rem",
    overflow: "auto",
  },

  CartDropDownMenu_overlay: {
    display: "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
  },

  CartDropDownMenu_overlay_show: {
    display: "block",
  },
});
