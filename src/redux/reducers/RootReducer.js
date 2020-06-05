import { combineReducers } from "redux";

import CartListReducer from "./cart-list/CartListReducer";
import CartMenuReducer from "./cart-menu/CartMenuReducer";
import FirebaseReducer from "./firebase/FirebaseReducer";
import FoldableMenuReducer from "./foldable-menu/FoldableMenuReducer";
import ProductListReducer from "./product-list/ProductListReducer";
import UserReducer from "./user/UserReducer";

export default combineReducers({
  cartList: CartListReducer,
  cartMenu: CartMenuReducer,
  firebase: FirebaseReducer,
  foldableMenu: FoldableMenuReducer,
  productList: ProductListReducer,
  user: UserReducer,
});
