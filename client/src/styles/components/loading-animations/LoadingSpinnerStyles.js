import { createUseStyles } from "react-jss";

export default createUseStyles({
  "@global": {
    "@keyframes lds-ring": {
      " 0%": {
        transform: "rotate(0deg)",
      },
      "100%": {
        transform: "rotate(360deg)",
      },
    },
  },

  LoadingSpinner: {
    display: "inline-block",
    position: "relative",
    width: (props) => (props.small ? "1.8rem" : "3.5rem"),
    height: (props) => (props.small ? "1.8rem" : "3.5rem"),

    "& div": {
      boxSizing: "border-box",
      display: "block",
      position: "absolute",

      width: (props) => (props.small ? "1.8rem" : "3rem"),
      height: (props) => (props.small ? "1.8rem" : "3rem"),
      margin: (props) => (props.small ? "0" : "0.3rem"),
      border: (props) =>
        props.small
          ? `0.2rem solid ${props.color}`
          : `0.3rem solid ${props.color}`,
      borderRadius: "50%",
      animation: "lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
      borderColor: (props) =>
        `${props.color} transparent transparent transparent`,
    },

    "& div:nth-child(1)": {
      animationDelay: "-0.45s",
    },

    "& div:nth-child(2)": {
      animationDelay: "-0.3s",
    },

    "& div:nth-child(3)": {
      animationDelay: "-0.15s",
    },
  },
});
