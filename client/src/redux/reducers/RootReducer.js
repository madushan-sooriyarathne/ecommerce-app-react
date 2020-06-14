import { combineReducers } from "redux";

import CartListReducer from "./cart-list/CartListReducer";
import CartMenuReducer from "./cart-menu/CartMenuReducer";
import FirebaseReducer from "./firebase/FirebaseReducer";
import FoldableMenuReducer from "./foldable-menu/FoldableMenuReducer";
import ProductListReducer from "./product-list/ProductListReducer";
import FavoriteProductListReducer from "./favorite-product-list/FavoriteProductListReducer";
import UserReducer from "./user/UserReducer";
import NotificationsReducer from "./notification/NotificationsReducer";

export default combineReducers({
  cartList: CartListReducer,
  cartMenu: CartMenuReducer,
  firebase: FirebaseReducer,
  foldableMenu: FoldableMenuReducer,
  productList: ProductListReducer,
  user: UserReducer,
  favoriteProductList: FavoriteProductListReducer,
  notifications: NotificationsReducer,
});
