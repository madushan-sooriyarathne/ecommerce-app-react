import React from "react";
import { connect } from "react-redux";

import { collectionSelector } from "../redux/reducers/product-list/ProductListSelectors";

import Collection from "../layouts/Collection";

import useStyles from "../styles/pages/ShopStyles";
import Page from "./Page";

const Shop = ({ mensProducts, womensProducts, sportsProducts }) => {
  const classes = useStyles();
  return (
    <Page>
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
    </Page>
  );
};

// Redux bindings
const mapStateToProps = (state) => ({
  mensProducts: collectionSelector("men")(state),
  womensProducts: collectionSelector("women")(state),
  sportsProducts: collectionSelector("sport")(state),
});

export default connect(mapStateToProps)(Shop);
