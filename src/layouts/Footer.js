import React from "react";
import { Link } from "react-router-dom";

import useStyles from "../styles/layouts/FooterStyles";

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.Footer}>
      <div className={`${classes.NavLinks_links} ${classes.category_links}`}>
        <h3 className={classes.NavLinks_title}>Categories</h3>
        <div className={classes.NavLinks_links}>
          <Link className={classes.Link} to="/category/men">
            Men
          </Link>
          <Link className={classes.Link} to="/category/women">
            Women
          </Link>
          <Link className={classes.Link} to="/category/sport">
            Sport
          </Link>
        </div>
      </div>
      <div className={`${classes.NavLinks_links} ${classes.company_links}`}>
        <h3 className={classes.NavLinks_title}>Company</h3>
        <div className={classes.NavLinks_links}>
          <Link className={classes.Link} to="/about">
            About
          </Link>
          <Link className={classes.Link} to="/faq">
            FAQ
          </Link>
          <Link className={classes.Link} to="/contact">
            contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
