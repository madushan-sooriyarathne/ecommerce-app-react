const INITIAL_STATE = {
  cartList: [],
};

const CartListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const matchingItem = state.cartList.filter(
        (item) => item.id === action.payload.item.id
      )[0];
      if (matchingItem) {
        return {
          cartList: state.cartList.map((item) =>
            item.id === action.payload.item.id
              ? { ...item, qtc: item.qtc + 1 }
              : item
          ),
        };
      } else {
        return {
          cartList: [...state.cartList, { ...action.payload.item, qtc: 1 }],
        };
      }
    case "REMOVE_ITEM":
      return {
        cartList: state.cartList.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "UPDATE_ITEM":
      return {
        cartList: state.cartList.map((item) =>
          item.id === action.payload.id ? action.payload.item : item
        ),
      };
    default:
      return state;
  }
};

export default CartListReducer;
