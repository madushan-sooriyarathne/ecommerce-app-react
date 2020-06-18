import React from "react";
import { connect } from "react-redux";

import { collectionSelector } from "../redux/reducers/product-list/ProductListSelectors";

import Page from "./Page";
import BoxSpinner from "../components/loading-animations/BoxSpinner";
import HeadingPrimarySlim from "../components/headings/HeadingPrimarySlim";
import Collection from "../layouts/Collection";

import useStyles from "../styles/pages/ShopStyles";

const Shop = ({
  mensProducts,
  womensProducts,
  sportsProducts,
  firebaseInitialized,
}) => {
  const classes = useStyles();
  return (
    <Page>
      {firebaseInitialized ? (
        <div className={classes.Shop}>
          {!(mensProducts.length < 1) && (
            <Collection type="men" productList={mensProducts} />
          )}
          {!(womensProducts.length < 1) && (
            <Collection type="women" productList={womensProducts} />
          )}
          {!(sportsProducts.length < 1) && (
            <Collection type="sport" productList={sportsProducts} />
          )}
        </div>
      ) : (
        <div className={classes.Shop_loadingContainer}>
          <BoxSpinner />
          <HeadingPrimarySlim>Loading...</HeadingPrimarySlim>
        </div>
      )}
    </Page>
  );
};

// Redux bindings
const mapStateToProps = (state) => ({
  mensProducts: collectionSelector("men")(state),
  womensProducts: collectionSelector("women")(state),
  sportsProducts: collectionSelector("sport")(state),
  firebaseInitialized: state.firebase.initialized,
});

export default connect(mapStateToProps)(Shop);
