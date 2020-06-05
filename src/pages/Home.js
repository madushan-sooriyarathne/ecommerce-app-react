import React from "react";
import HeroBanner from "../layouts/HeroBanner";

import useStyles from "../styles/pages/HomeStyles";
import CategoryContainer from "../layouts/CategoryContainer";
import NewArrivals from "../layouts/NewArrivals";
import FeaturesGrid from "../layouts/FeaturesGrid";
import Newsletter from "../layouts/Newsletter";

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
