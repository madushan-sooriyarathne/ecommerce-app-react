import React from "react";
import Link from "../components/Link";
import { Link as RouterLink } from "react-router-dom";

import useStyles from "../styles/layouts/FooterStyles";

import sprites from "../img/svg/sprites.svg";

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.Footer}>
      <div className={classes.Footer_top}>
        <div className={`${classes.Footer_NavLinks} ${classes.category_links}`}>
          <h3 className={classes.NavLinks_title}>Categories</h3>
          <div className={classes.NavLinks_links}>
            <RouterLink className={classes.RouterLink} to="/collection/men">
              Men
            </RouterLink>
            <RouterLink className={classes.RouterLink} to="/collection/women">
              Women
            </RouterLink>
            <RouterLink className={classes.RouterLink} to="/collection/sport">
              Sport
            </RouterLink>
          </div>
        </div>
        <div className={`${classes.Footer_NavLinks} ${classes.company_links}`}>
          <h3 className={classes.NavLinks_title}>Contact</h3>
          <div className={classes.NavLinks_links}>
            <RouterLink to="/shop" className={classes.RouterLink}>
              Shop
            </RouterLink>
            <RouterLink to="/about" className={classes.RouterLink}>
              About
            </RouterLink>
            <RouterLink to="/account" className={classes.RouterLink}>
              Account
            </RouterLink>
          </div>
        </div>
        <div className={`${classes.Footer_NavLinks} ${classes.social_links}`}>
          <h3 className={classes.NavLinks_title}>Social Media</h3>
          <div className={classes.Social_media}>
            <div className={classes.Social_button}>
              <a
                href="https://www.facebook.com/madushan.sooriyarathne/"
                rel="nonref nonopener"
                target="_blank"
              >
                <svg className={classes.Social_icon}>
                  <use xlinkHref={`${sprites}#icon-facebook`}></use>
                </svg>
              </a>
            </div>
            <div className={classes.Social_button}>
              <a
                href="https://www.instagram.com/iam_madushan"
                rel="nonref nonopener"
                target="_blank"
              >
                <svg className={classes.Social_icon}>
                  <use xlinkHref={`${sprites}#icon-instagram`}></use>
                </svg>
              </a>
            </div>
            <div className={classes.Social_button}>
              <a
                href="https://github.com/madushan-sooriyarathne"
                rel="nonref nonopener"
                target="_blank"
              >
                <svg className={classes.Social_icon}>
                  <use xlinkHref={`${sprites}#icon-github`}></use>
                </svg>
              </a>
            </div>
            <div className={classes.Social_button}>
              <a
                href="https://t.me/iammadushan"
                rel="nonref nonopener"
                target="_blank"
              >
                <svg className={classes.Social_icon}>
                  <use xlinkHref={`${sprites}#icon-telegram`}></use>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.Footer_bottom}>
        <p className={classes.Footer_copyrights}>
          Copyright {new Date().getFullYear()} &copy; Winter Fashion Ltd.
        </p>
      </div>
    </div>
  );
};

export default Footer;
