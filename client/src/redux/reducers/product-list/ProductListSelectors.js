import { createSelector } from "reselect";

const productListSelector = (state) => state.productList.productList;

const collectionSelector = (collectionId) => {
  return createSelector(productListSelector, (productList) =>
    productList.filter((product) => product.category === collectionId)
  );
};

const productByIdSelector = (productId) =>
  createSelector(productListSelector, (productList) => {
    const filteredList = productList.filter(
      (product) => product && product.id === productId
    );
    if (filteredList.length < 1) {
      return null;
    } else {
      return filteredList[0];
    }
  });

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

export {
  collectionSelector,
  productListSelector,
  getAvailableProducts,
  productByIdSelector,
};
