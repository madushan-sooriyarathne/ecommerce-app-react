import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { addCartItem } from "../redux/reducers/cart-list/CartListActions";
import {
  showNotification,
  removeNotification,
} from "../redux/reducers/notification/NotifcationActions";
import {
  addToFavorite,
  removeFromFavorite,
} from "../redux/reducers/favorite-product-list/FavoriteProductListActions";
import { getCurrentUserId } from "../redux/reducers/user/UserSelectors";

import AddToFavoriteButton from "../components/AddToFavoriteButton";
import ButtonAnimated from "./buttons/ButtonAnimated";

import { checkFavoriteProductListSelector } from "../redux/reducers/favorite-product-list/FavoriteProductListSelectors";

import useStyles from "../styles/components/ProductListItemStyles";

const ProductListItem = ({
  currentUserId,
  product,
  isFavorite,
  addItemToCart,
  addToFavoriteList,
  removeFromFavoriteList,
  showNotification,
  removeNotification,
}) => {
  // History hook
  const history = useHistory();

  const { id, imgURL, ratings, name, category, price, sizes, colors } = product;

  // Event handlers
  // Item Click Event
  const handleItemClick = (event) => {
    history.push(`/product/${id}`);
  };

  // ADD TO CART Button Click Event
  const handleAddToCart = (event) => {
    // Stop event propagation
    event.stopPropagation();

    const item = {
      id,
      imgURL,
      ratings,
      name,
      category,
      price,
      color: colors[0],
      size: sizes[0],
    };

    // Add item to cart
    addItemToCart(item);

    // Show a notification to user
    showNotification({ message: "Item added to the cart", type: "success" });
    setTimeout(() => removeNotification(), 5000);
  };

  const classes = useStyles({ img: imgURL });

  return (
    <div className={classes.ProductListItem} onClick={handleItemClick}>
      <div className={classes.Item_img}>
        <div className={classes.Item_ratings}>{ratings} / 5.0</div>
      </div>
      <div className={classes.Item_content}>
        <div className={classes.Item_details}>
          <h3 className={classes.Item_name}>{name}</h3>
          <p className={classes.Item_category}>{category}</p>
          <p className={classes.Item_price}>{`$ ${price}`}</p>
        </div>
        <div className={classes.Item_btnSet}>
          <ButtonAnimated
            primaryColor="#3C2858"
            secondaryColor="#fff"
            onClick={handleAddToCart}
            isSmall={true}
            styles={{
              padding: "1.2rem 1rem",
            }}
          >
            Add to cart
          </ButtonAnimated>

          <AddToFavoriteButton
            currentUserId={currentUserId}
            productId={product.id}
            isFavorite={isFavorite}
            removeFromFavoriteList={removeFromFavoriteList}
            addToFavoriteList={addToFavoriteList}
            isSmall={true}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isFavorite: checkFavoriteProductListSelector(ownProps.product.id)(state),
  currentUserId: getCurrentUserId(state),
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addCartItem(item)),
  addToFavoriteList: (item) => dispatch(addToFavorite(item)),
  removeFromFavoriteList: (item) => dispatch(removeFromFavorite(item)),
  showNotification: (notification) => dispatch(showNotification(notification)),
  removeNotification: () => dispatch(removeNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListItem);
