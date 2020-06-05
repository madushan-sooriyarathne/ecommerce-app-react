import React from "react";
import { connect } from "react-redux";

import useListState from "../hooks/UseListState";

import CollectionContainer from "./CollectionContainer";
import ProductListItem from "../components/ProductListItem";
import HeadingPrimary from "../components/headings/HeadingPrimary";

import useStyles from "../styles/layouts/NewArrivalsStyles";

const NewArrivals = ({ productList }) => {
  const classes = useStyles();

  const [selectors, toggleSelector] = useListState([
    { name: "All", id: "all", isActive: true },
    { name: "Men", id: "men", isActive: false },
    { name: "Women", id: "women", isActive: false },
    { name: "Sport", id: "sport", isActive: false },
  ]);

  const handleSelect = (event) => {
    const el = event.target.closest(".filter-btn");
    if (el) {
      const id = el.dataset.id;
      //select the item
      toggleSelector(id);
    }
  };

  return (
    <div className={classes.NewArrivals}>
      <div className={classes.Header}>
        {/* Header */}
        <HeadingPrimary styles={{ fontSize: "5rem" }}>
          New Arrivals
        </HeadingPrimary>
        <div className={classes.Header_btnSet}>
          {selectors.map((selector) => (
            <button
              className={`${classes.filterBtn} ${
                selector.isActive && classes.filterBtn_selected
              } filter-btn`}
              data-id={selector.id}
              onClick={handleSelect}
              key={selector.id}
            >
              {selector.name}
            </button>
          ))}
        </div>
      </div>
      <CollectionContainer>
        {selectors.filter((selector) => selector.isActive)[0].id === "all"
          ? productList.map((product) => (
              <ProductListItem
                name={product.name}
                category={product.category}
                price={parseFloat(product.price)}
                ratings={product.ratings}
                img={product.imgURL}
                isAvailable={product.availability}
                isFavorite={true}
                id={product.id}
                key={product.id}
              />
            ))
          : productList
              .filter(
                (product) =>
                  product.category ===
                  selectors.filter((selector) => selector.isActive)[0].id
              )
              .map((product) => (
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

//Redux Mappings
const mapStateToProps = (state) => ({
  productList: state.productList.productList,
});

export default connect(mapStateToProps, null)(NewArrivals);
