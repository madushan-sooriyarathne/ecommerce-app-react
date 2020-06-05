import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { closeFoldableMenu } from "../redux/reducers/foldable-menu/FoldableMenuActions";

import useStyles from "../styles/layouts/FoldableSideMenuStyles";

import sprites from "../img/svg/sprites.svg";

const FoldableSideMenu = ({
  children,
  closeFoldableMenu,
  foldableMenuOpen,
}) => {
  const classes = useStyles({ foldableMenuOpen });

  // history hook
  const history = useHistory();

  useEffect(() => {
    // Listen to route change event and close the foldable menu when the current route changes
    const unsubscribeToHistory = history.listen((location, action) => {
      window.scrollTo(0, 0);
      closeFoldableMenu();
    });

    return () => unsubscribeToHistory();
  }, [closeFoldableMenu, history]);

  const handleOutsideClick = (event) => {
    const el = event.target.closest(".side-bar");
    if (!el) {
      closeFoldableMenu();
    }
  };

  return (
    <>
      <div
        className={`${classes.FoldableSideMenu} ${
          foldableMenuOpen && classes.FoldableSideMenu_open
        }`}
        onClick={handleOutsideClick}
      ></div>
      <div
        className={`${classes.FoldableSideMenu_sidebar} ${
          foldableMenuOpen && classes.FoldableSideMenu_sidebar_open
        } side-bar`}
      >
        <svg
          className={classes.FoldableSideMenu_sidebar_close_btn}
          onClick={(event) => closeFoldableMenu()}
        >
          <use xlinkHref={`${sprites}#icon-close`}></use>
        </svg>
        {children}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  foldableMenuOpen: state.foldableMenu.foldableMenuOpen,
});

const mapDispatchToProps = (dispatch) => ({
  closeFoldableMenu: () => dispatch(closeFoldableMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoldableSideMenu);
