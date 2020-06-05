import React from "react";
import { connect } from "react-redux";

import { collectionSelector } from "../redux/reducers/product-list/ProductListSelectors";

import CollectionContainer from "../layouts/CollectionContainer";
import ProductListItem from "../components/ProductListItem";

import useStyles from "../styles/pages/CategoryStyles";

const Category = ({ productList }) => {
  const classes = useStyles();

  return (
    <div className={classes.Category}>
      <CollectionContainer styles={{ gridColumn: "start / end" }}>
        {productList.map((product) => (
          <ProductListItem
            name={product.name}
            category={product.category}
            price={parseFloat(product.price)}
            ratings={product.ratings}
            img={product.imgURL}
            isAvailable={product.availability}
            isFavorite={true}
            id={product.id}
          />
        ))}
      </CollectionContainer>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  productList: collectionSelector(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps, null)(Category);
