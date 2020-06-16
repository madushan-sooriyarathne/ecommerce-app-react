import React from "react";
import { connect } from "react-redux";

import { collectionSelector } from "../redux/reducers/product-list/ProductListSelectors";

import CollectionContainer from "../layouts/CollectionContainer";
import ProductListItem from "../components/ProductListItem";
import HeadingPrimarySlim from "../components/headings/HeadingPrimarySlim";

import useStyles from "../styles/pages/CategoryStyles";
import Page from "./Page";

const Category = ({ productList, match }) => {
  const classes = useStyles();

  return (
    <Page>
      <div className={classes.Category}>
        <HeadingPrimarySlim>{`${
          match.params.collectionId.charAt(0).toUpperCase() +
          match.params.collectionId.slice(1)
        }'s Collection`}</HeadingPrimarySlim>
        <CollectionContainer styles={{ gridColumn: "start / end" }}>
          {productList.map((product) => (
            <ProductListItem product={product} key={product.id} />
          ))}
        </CollectionContainer>
      </div>
    </Page>
  );
};

const mapStateToProps = (state, ownProps) => ({
  productList: collectionSelector(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps, null)(Category);
