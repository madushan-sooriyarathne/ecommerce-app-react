import React from "react";
import CollectionContainer from "./CollectionContainer";
import ProductListItem from "../components/ProductListItem";
import HeadingPrimary from "../components/headings/HeadingPrimary";

import useStyles from "../styles/layouts/CollectionStyles";

const Collection = ({ type, productList }) => {
  const classes = useStyles();
  return (
    <div className={classes.Collection}>
      <div className={classes.Collection_header}>
        <HeadingPrimary>{`${type}'s Collection`}</HeadingPrimary>
        <button className={classes.Heading_btn}>
          See More <span className={classes.arrow}>&#8594;</span>{" "}
        </button>
      </div>
      <CollectionContainer>
        {productList.map((product) => (
          <ProductListItem product={product} id={product.id} />
        ))}
      </CollectionContainer>
    </div>
  );
};

export default Collection;
