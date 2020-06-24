import { createUseStyles } from "react-jss";

export default createUseStyles({
  CurrentUserBadge: {
    display: "flex",
    alignItems: "center",
    padding: "2rem 4rem",
  },

  CurrentUserBadge_Profile: {
    position: "relative",
    width: "10rem",
    height: "10rem",
    borderRadius: "50%",
    overflow: "hidden",
    marginRight: "2rem",

    "&:hover $CurrentUserBadge_profile_image_holder": {
      visibility: "visible",
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  CurrentUserBadge_profile_image: {
    width: "10rem",
    height: "10rem",
  },
  CurrentUserBadge_profile_image_holder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0, 0.3)",
    position: "absolute",
    top: 0,
    left: 0,
    cursor: "pointer",
    visibility: "hidden",
    opacity: 0,
    transform: "translateY(100%)",
    transition: "all 0.2s ease-in-out",
  },

  CurrentUserBadge_file_selector: {
    width: "100%",
    height: "100%",
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    cursor: "pointer",
  },

  CurrentUserBadge_profile_image_update: {
    width: "5rem",
    height: "5rem",

    fill: "var(--color-white)",
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
