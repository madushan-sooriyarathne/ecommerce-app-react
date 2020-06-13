import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";

import { toggleFoldableMenu } from "../redux/reducers/foldable-menu/FoldableMenuActions";

import ButtonStatic from "../components/buttons/ButtonStatic";
import CurrentUserBadge from "../components/CurrentUserBadge";
import LoadingSpinner from "../components/loading-animations/LoadingSpinner";
import TabButton from "../components/TabButton";

import FoldableSideMenu from "./FoldableSideMenu";

import useStyles from "../styles/layouts/NavBarStyles";

import sprites from "../img/svg/sprites.svg";
import CartDropDownMenu from "../components/CartDropDownMenu";
import SearchBar from "../components/SarchBar";

const NavBar = ({ firebaseInitialized, currentUser, toggleFoldableMenu }) => {
  //Styles
  const classes = useStyles();

  return (
    <div className={classes.NavBar}>
      <FoldableSideMenu>
        <div className={classes.NavBar_user_auth_details}>
          {firebaseInitialized ? (
            currentUser ? (
              <CurrentUserBadge
                username={currentUser.displayName.split(" ")[0]}
                displayImage={currentUser.photoURL}
                withAccountLink={true}
              />
            ) : (
              <div className={classes.NavBar_centered_container}>
                <Link to="/login">
                  <ButtonStatic
                    primaryColor="var(--color-primary)"
                    isSmall={true}
                  >
                    Log In
                  </ButtonStatic>
                </Link>
                <Link to="/signup">
                  <ButtonStatic
                    primaryColor="var(--color-primary-medium)"
                    isSmall={true}
                  >
                    Sign Up
                  </ButtonStatic>
                </Link>
              </div>
            )
          ) : (
            <div className={classes.NavBar_centered_container}>
              <p className={classes.NavBar_loading_text}>Initializing</p>
              <LoadingSpinner small={true} />
            </div>
          )}
        </div>

        <div className={classes.NavBar_nav_menu}>
          <NavLink exact to="/" activeClassName={classes.NavLinks_selected}>
            <TabButton
              isActive={false}
              isSmall={false}
              styles={{ width: "100%" }}
            >
              Home
            </TabButton>
          </NavLink>
          <NavLink exact to="/shop" activeClassName={classes.NavLinks_selected}>
            <TabButton
              isActive={false}
              isSmall={false}
              styles={{ width: "100%" }}
            >
              Shop
            </TabButton>
          </NavLink>
          <NavLink
            exact
            to="/about"
            activeClassName={classes.NavLinks_selected}
          >
            <TabButton
              isActive={false}
              isSmall={false}
              styles={{ width: "100%" }}
            >
              About
            </TabButton>
          </NavLink>
        </div>
      </FoldableSideMenu>
      <svg
        className={classes.NavBar_menu_btn}
        onClick={(event) => toggleFoldableMenu()}
      >
        <use xlinkHref={`${sprites}#icon-menu`}></use>
      </svg>
      <div className={classes.NavBar_logo}>
        <h1 className={"Logo"}>Winter</h1>
      </div>
      <div className={classes.NavBar_search_and_cart}>
        <CartDropDownMenu />
        <SearchBar />
      </div>
    </div>
  );
};

// Redux mappings
const mapStateToProps = (state) => ({
  firebaseInitialized: state.firebase.initialized,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  toggleFoldableMenu: () => dispatch(toggleFoldableMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
