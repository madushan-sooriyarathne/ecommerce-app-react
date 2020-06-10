const INITIAL_STATE = {
  favorites: [],
};

const FavoriteProductListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_FAVORITE":
      return { favorites: [...state.favorites, action.payload.productId] };

    case "UPDATE_PRODUCT_LIST":
      return { favorites: action.payload.productList };

    case "REMOVE_PRODUCT_FROM_FAVORITE":
      return {
        favorites: state.favorites.filter(
          (fav) => fav !== action.payload.productId
        ),
      };

    default:
      return state;
  }
};

export default FavoriteProductListReducer;
