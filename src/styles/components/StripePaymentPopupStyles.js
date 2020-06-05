import { createUseStyles } from "react-jss";

export default createUseStyles({
  StripePaymentPopup: {},
  StripePaymentPopup_overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backdropFilter: "blur(10px)",
    visibility: "hidden",
    opacity: 0,
  },
  StripePaymentPopup_overlay_show: {
    visibility: "visible",
    opacity: 1,
    transition: "opacity 0.2s ease-in",
  },
  StripePaymentPopup_popup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) scale(0.1)",
    visibility: "hidden",
    opacity: 0,
    width: "50rem",
    padding: "10rem 5rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: "var(--color-primary-light)",
  },
  StripePaymentPopup_popup_show: {
    visibility: "visible",
    opacity: 1,
    transform: "translate(-50%, -50%) scale(1)",
    transition: "opacity 0.2s ease-in, transform 0.2s ease-in",
    willChange: "transform",
  },
  StripePaymentPopup_popup_close: {
    position: "absolute",
    top: 15,
    right: 15,
    width: "2.5rem",
    height: "2.5rem",
    fill: "var(--color-primary)",
    cursor: "pointer",
    transition: "all 0.2s ease-in",
    display: "inline-block",

    "&:hover": {
      transform: "scale(1.2)",
      fill: "var(--color-primary-medium)",
    },
  },
});
