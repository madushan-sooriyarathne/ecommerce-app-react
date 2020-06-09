import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import { firestore } from "../utils/FirebaseUtils";

import Page from "./Page";
import ButtonStatic from "../components/buttons/ButtonStatic";

import useStyles from "../styles/pages/ProductPageStyles";
import BoxSpinner from "../components/loading-animations/BoxSpinner";
import HeadingPrimarySlim from "../components/headings/HeadingPrimarySlim";
import { productByIdSelector } from "../redux/reducers/product-list/ProductListSelectors";
import { connect } from "react-redux";

const ProductPage = ({ currentProduct }) => {
  //  History object
  const history = useHistory();

  // Styles
  const classes = useStyles();

  return (
    <Page>
      <div className={classes.Container}>
        <BoxSpinner />
        <HeadingPrimarySlim>Loading...</HeadingPrimarySlim>
      </div>
    </Page>
  );
};

const mapStateToProps = (state, ownProps) => ({
  currentProduct: productByIdSelector(ownProps.match.params.product_id)(state),
});

export default connect(mapStateToProps, null)(ProductPage);
