import { createSelector } from "reselect";

const cartListSelector = (state) => state.cartList.cartList;

const subTotalSelector = createSelector([cartListSelector], (cartList) =>
  cartList.reduce((acc, cur) => acc + cur.price * cur.qtc, 0)
);

const qtcSelector = createSelector([cartListSelector], (cartList) =>
  cartList.reduce((acc, cur) => acc + cur.qtc, 0)
);

export { subTotalSelector, qtcSelector };
