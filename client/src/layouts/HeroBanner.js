import React from "react";

import ButtonAnimated from "../components/buttons/ButtonAnimated";

import useStyles from "../styles/layouts/HeroBannerStyles";

import heroBackground from "../img/hero-bg.jpg";
import { useHistory } from "react-router-dom";

const HeroBanner = () => {
  const classes = useStyles({ img: heroBackground });

  // History hook
  const history = useHistory();

  return (
    <div className={classes.HeroBanner}>
      <div className={classes.Content}>
        <h3 className={classes.subHeading}>Winter Fashion</h3>
        <h1 className={classes.mainHeading}>
          Fashion <br /> Collection 2020
        </h1>
        <ButtonAnimated onClick={() => history.push("/shop")}>
          Shop Now
        </ButtonAnimated>
      </div>
    </div>
  );
};

export default HeroBanner;
