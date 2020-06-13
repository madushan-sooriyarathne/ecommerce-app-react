import React from "react";
import HeroBanner from "../layouts/HeroBanner";

import CategoryContainer from "../layouts/CategoryContainer";
import NewArrivals from "../layouts/NewArrivals";
import FeaturesGrid from "../layouts/FeaturesGrid";
import Newsletter from "../layouts/Newsletter";
import BoxSpinner from "../components/loading-animations/BoxSpinner";

import useStyles from "../styles/pages/HomeStyles";

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.Home}>
      <HeroBanner />
      <CategoryContainer />
      <NewArrivals />

      <FeaturesGrid />
      <Newsletter />
    </div>
  );
};

export default Home;
