import { createUseStyles } from "react-jss";
import { NAV_BAR_MIN_HEIGHT } from "../../consts";

export default createUseStyles({
  CenteredPage: {
    width: "100vw",
    minHeight: `calc(100vh - ${NAV_BAR_MIN_HEIGHT} - 5px)`,
    padding: "10rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
