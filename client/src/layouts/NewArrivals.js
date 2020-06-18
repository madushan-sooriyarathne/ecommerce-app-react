import React from "react";
import { connect } from "react-redux";

import useListState from "../hooks/UseListState";

import CollectionContainer from "./CollectionContainer";
import ProductListItem from "../components/ProductListItem";
import HeadingPrimary from "../components/headings/HeadingPrimary";
import HeadingPrimarySlim from "../components/headings/HeadingPrimarySlim";
import useStyles from "../styles/layouts/NewArrivalsStyles";
import BoxSpinner from "../components/loading-animations/BoxSpinner";

import empty from "../img/svg/empty.svg";

const NewArrivals = ({ productList, firebaseInitialized }) => {
  const classes = useStyles();

  const [selectors, toggleSelector] = useListState([
    { name: "All", id: "all", isActive: true },
    { name: "Men", id: "men", isActive: false },
    { name: "Women", id: "women", isActive: false },
    { name: "Sport", id: "sport", isActive: false },
  ]);

  const filteredList = productList.filter(
    (product) =>
      product.category ===
      selectors.filter((selector) => selector.isActive)[0].id
  );

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
      <div className={classes.NewArrivals_content}>
        {firebaseInitialized ? (
          selectors.filter((selector) => selector.isActive)[0].id === "all" ? (
            productList.length < 1 ? (
              <div className={classes.Empty}>
                <img
                  className={classes.Empty_img}
                  src={empty}
                  alt="No Products"
                ></img>{" "}
                <HeadingPrimarySlim styles={{ color: "var(--color-error)" }}>
                  Sorry! We ran out of products in this category.
                </HeadingPrimarySlim>
              </div>
            ) : (
              <CollectionContainer>
                {productList.map((product) => (
                  <ProductListItem product={product} key={product.id} />
                ))}
              </CollectionContainer>
            )
          ) : filteredList.length < 1 ? (
            <div className={classes.Empty}>
              <img
                className={classes.Empty_img}
                src={empty}
                alt="No Products"
              ></img>{" "}
              <HeadingPrimarySlim styles={{ color: "var(--color-error)" }}>
                Sorry! We ran out of products in this category.
              </HeadingPrimarySlim>
            </div>
          ) : (
            <CollectionContainer>
              {filteredList.map((product) => (
                <ProductListItem product={product} key={product.id} />
              ))}
            </CollectionContainer>
          )
        ) : (
          <div className={classes.Loading}>
            <BoxSpinner />
            <HeadingPrimarySlim>Loading...</HeadingPrimarySlim>
          </div>
        )}
      </div>
    </div>
  );
};

//Redux Mappings
const mapStateToProps = (state) => ({
  productList: state.productList.productList,
  firebaseInitialized: state.firebase.initialized,
});

export default connect(mapStateToProps, null)(NewArrivals);
