import { createSelector } from "reselect";

const favoriteProductListSelector = (state) =>
  state.favoriteProductList.favorites;

const checkFavoriteProductListSelector = (productId) =>
  createSelector([favoriteProductListSelector], (favoriteProductList) =>
    favoriteProductList.includes(productId)
  );

export { favoriteProductListSelector, checkFavoriteProductListSelector };
