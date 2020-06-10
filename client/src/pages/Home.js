import React from "react";
import HeroBanner from "../layouts/HeroBanner";

import useStyles from "../styles/pages/HomeStyles";
import CategoryContainer from "../layouts/CategoryContainer";
import NewArrivals from "../layouts/NewArrivals";
import FeaturesGrid from "../layouts/FeaturesGrid";
import Newsletter from "../layouts/Newsletter";
import BoxSpinner from "../components/loading-animations/BoxSpinner";
import { connect } from "react-redux";

const Home = ({ firebaseInitialized }) => {
  const classes = useStyles();
  return (
    <div className={classes.Home}>
      <HeroBanner />
      <CategoryContainer />
      {firebaseInitialized ? <NewArrivals /> : <BoxSpinner />}

      <FeaturesGrid />
      <Newsletter />
    </div>
  );
};

const mapStateToProps = (state) => ({
  firebaseInitialized: state.firebase.initialized,
});

export default connect(mapStateToProps, null)(Home);
