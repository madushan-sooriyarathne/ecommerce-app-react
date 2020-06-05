import { createUseStyles } from "react-jss";

export default createUseStyles({
  CurrentUserBadge: {
    display: "flex",
    alignItems: "center",
    padding: "2rem 4rem",
  },
  CurrentUserBadge_profile_image: {
    width: "10rem",
    height: "10rem",
    borderRadius: "50%",
    marginRight: "2rem",
  },
  CurrentUserBadge_details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  CurrentUserBadge_greeting: {
    fontSize: "2rem",
    fontWeight: "300",
    textTransform: "uppercase",
    // lineHeight: "1rem",
  },
  CurrentUserBadge_userName: {
    fontSize: "1.5rem",
    fontWeight: 500,
    textTransform: "uppercase",
  },

  CurrentUserBadge_buttons: {
    marginTop: "1rem",
    display: "flex",

    "& > *:not(:last-child)": {
      marginRight: "0.5rem",
    },
  },
});
