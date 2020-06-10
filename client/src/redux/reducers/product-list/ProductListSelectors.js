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

const getProductsByIds = (idList) => {
  let filteredList = [];
  idList.forEach((productId) => {
    const product = productByIdSelector(productId);
    if (product) {
      filteredList.push(product);
    }
  });
  return filteredList;
};

export {
  collectionSelector,
  productListSelector,
  productByIdSelector,
  getProductsByIds,
};
