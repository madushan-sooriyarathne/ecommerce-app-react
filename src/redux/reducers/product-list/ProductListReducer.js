const INITIAL_STATE = {
  productList: [],
};

const ProductListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return { productList: [...state.productList, action.payload.product] };

    case "ADD_PRODUCT_LIST":
      return {
        productList: [...state.productList, ...action.payload.products],
      };
    case "REMOVE_PRODUCT":
      return {
        productList: state.productList.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    case "UPDATE_PRODUCT":
      return {
        productList: state.productList.map((product) =>
          product.id === action.payload.id ? action.payload.product : product
        ),
      };
    default:
      return state;
  }
};

export default ProductListReducer;
