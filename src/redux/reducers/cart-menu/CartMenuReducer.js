const INITIAL_STATE = {
  cartMenuOpened: false,
};

const CartMenuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_MENU":
      return { cartMenuOpened: !state.cartMenuOpened };
    case "OPEN_MENU":
      return { cartMenuOpened: true };
    case "CLOSE_MENU":
      return { cartMenuOpened: false };
    default:
      return state;
  }
};

export default CartMenuReducer;
