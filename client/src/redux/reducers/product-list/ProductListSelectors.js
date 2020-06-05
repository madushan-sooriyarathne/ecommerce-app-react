import { createSelector } from "reselect";

const productListSelector = (state) => state.productList.productList;

const collectionSelector = (collectionId) => {
  return createSelector(productListSelector, (productList) =>
    productList.filter((product) => product.category === collectionId)
  );
};

// TODO: REMOVE OBSOLETE CODE
// const mensProductSelector = createSelector(productListSelector, (productList) =>
//   productList.filter((product) => product.category === "men")
// );

// const womensProductSelector = createSelector(
//   productListSelector,
//   (productList) => productList.filter((product) => product.category === "women")
// );

// const sportsProductSelector = createSelector(
//   productListSelector,
//   (productList) => productList.filter((product) => product.category === "sport")
// );

const getAvailableProducts = createSelector(
  productListSelector,
  (productList) =>
    productList.filter((product) => {
      const values = Object.values(product.availability);
      let hasItems = false;

      if (values.length < 1) {
        return hasItems;
      }

      values.forEach((value) => {
        if (!(value < 1)) {
          hasItems = true;
        }
      });

      return hasItems;
    })
);

export { collectionSelector, productListSelector, getAvailableProducts };
