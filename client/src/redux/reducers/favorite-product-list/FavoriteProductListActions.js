const addToFavorite = (productId) => ({
  type: "ADD_PRODUCT_TO_FAVORITE",
  payload: { productId },
});

const updateFavoriteProductList = (productList) => ({
  type: "UPDATE_PRODUCT_LIST",
  payload: { productList },
});

const removeFromFavorite = (productId) => ({
  type: "REMOVE_PRODUCT_FROM_FAVORITE",
  payload: { productId },
});

export { addToFavorite, removeFromFavorite, updateFavoriteProductList };
