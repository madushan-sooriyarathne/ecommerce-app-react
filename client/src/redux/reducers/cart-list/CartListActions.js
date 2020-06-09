export const addCartItem = (item) => {
  return { type: "ADD_ITEM", payload: { item } };
};

export const removeCartItem = (id) => {
  return { type: "REMOVE_ITEM", payload: { id } };
};

export const updateCartItem = (id, item) => {
  return { type: "UPDATE_ITEM", payload: { id, item } };
};

export const clearCartList = () => {
  return { type: "CLEAR_CART" };
};
