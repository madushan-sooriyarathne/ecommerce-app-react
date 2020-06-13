import { createUseStyles } from "react-jss";

export default createUseStyles({
  AuthProviderBadge: {
    display: "grid",
    gridTemplateColumns: "min-content 1fr",
    borderRadius: "5px",
    overflow: "hidden",
    border: "2px solid var(--color-primary)",
    alignSelf: "flex-start",
  },
  Logo: {
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  LogoImg: {
    width: "3rem",
    height: "3rem",
  },
  ProviderText: {
    fontSize: "1.8rem",
    fontWeight: "500",
    color: "var(--color-white)",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: "var(--color-primary)",
  },
});
