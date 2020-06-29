import React from "react";
import { connect } from "react-redux";

import {
  addToFavorite,
  removeFromFavorite,
} from "../redux/reducers/favorite-product-list/FavoriteProductListActions";
import { getCurrentUserId } from "../redux/reducers/user/UserSelectors";
import { productByIdSelector } from "../redux/reducers/product-list/ProductListSelectors";
import { addCartItem } from "../redux/reducers/cart-list/CartListActions";
import { checkFavoriteProductListSelector } from "../redux/reducers/favorite-product-list/FavoriteProductListSelectors";

import Page from "./Page";

import HeadingPrimary from "../components/headings/HeadingPrimary";
import HeadingPrimarySlim from "../components/headings/HeadingPrimarySlim";
import BoxSpinner from "../components/loading-animations/BoxSpinner";
import ButtonStatic from "../components/buttons/ButtonStatic";
import AddToFavoriteButton from "../components/AddToFavoriteButton";

import useStyles from "../styles/pages/ProductPageStyles";

import useListState from "../hooks/UseListState";
import {
  showNotification,
  removeNotification,
} from "../redux/reducers/notification/NotifcationActions";

const ProductPage = ({
  currentUserId,
  currentProduct,
  isFavorite,
  addItemToCart,
  addToFavoriteList,
  removeFromFavoriteList,
  showNotification,
  removeNotification,
}) => {
  // Styles
  const classes = useStyles();

  // State
  const [colorOptions, toggleColorOptions] = useListState(
    currentProduct.colors.map((color, index) =>
      index === 0
        ? { ...color, id: color.hex, isActive: true }
        : { ...color, id: color.hex, isActive: false }
    )
  );
  const [sizeOptions, toggleSizeOptions] = useListState(
    currentProduct.sizes.map((size, index) =>
      index === 0 ? { id: size, isActive: true } : { id: size, isActive: false }
    )
  );

  const handleAddToCart = (event) => {
    const { id, category, imgURL, name, price, ratings } = currentProduct;
    const { name: colorName, hex } = colorOptions.filter(
      (color) => color.isActive
    )[0];
    const { id: size } = sizeOptions.filter((size) => size.isActive)[0];
    const item = {
      id,
      category,
      imgURL,
      name,
      price,
      ratings,
      size,
      color: { name: colorName, hex },
    };

    addItemToCart(item);

    //show success notification
    showNotification({ message: "Item added to cart", type: "successs" });
    setTimeout(() => removeNotification(), 5000);
  };

  const handleSizeSelect = (event) => {
    const el = event.target.closest(".size-box");
    if (el) toggleSizeOptions(el.dataset.id);
  };

  const handleColorSelect = (event) => {
    const el = event.target.closest(".color-box");
    if (el) toggleColorOptions(el.dataset.id);
  };

  return (
    <Page>
      {currentProduct ? (
        <div className={classes.ProductPage}>
          <div className={classes.ProductPage_images}>
            {[currentProduct.imgURL, ...currentProduct.secondaryImg].map(
              (img) => (
                <img src={img} alt="product" className={classes.Img_box}></img>
              )
            )}
          </div>
          <div className={classes.ProductPage_details}>
            <div className={classes.Details_basic}>
              <h3 className={classes.Details_category_tag}>
                {currentProduct.category}
              </h3>
              <HeadingPrimary>{currentProduct.name}</HeadingPrimary>
              <p className={classes.Details_price_tag}>
                $ {currentProduct.price}
              </p>
            </div>
            <div className={classes.Details_selections}>
              <div className={classes.Selection_group}>
                <p className={classes.Selection_label}>
                  Select a Available Size
                </p>
                <div className={classes.Selection_box_array}>
                  {sizeOptions.map((option) => (
                    <div
                      className={`size-box ${classes.Selection_box} ${
                        option.isActive && classes.Selection_box_active
                      }`}
                      key={option.id}
                      data-id={option.id}
                      onClick={handleSizeSelect}
                    >
                      {option.id}
                    </div>
                  ))}
                </div>
              </div>
              <div className={classes.Selection_group}>
                <p className={classes.Selection_label}>
                  Select a Available Color
                </p>
                <div className={classes.Selection_box_array}>
                  {colorOptions.map((color) => (
                    <div
                      className={`size-box ${classes.Selection_box} ${
                        color.isActive && classes.Selection_box_active
                      }`}
                      key={color.id}
                      data-id={color.id}
                      onClick={handleColorSelect}
                    >
                      {color.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className={classes.Btn_group}>
                <ButtonStatic isSmall={false} onClick={handleAddToCart}>
                  Add to Cart
                </ButtonStatic>
                <AddToFavoriteButton
                  currentUserId={currentUserId}
                  productId={currentProduct.id}
                  isFavorite={isFavorite}
                  removeFromFavoriteList={removeFromFavoriteList}
                  addToFavoriteList={addToFavoriteList}
                />
              </div>
            </div>
            <ul className={classes.Details_description}>
              {currentProduct.description.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
            <div className={classes.Details_note}>
              <p className={classes.Note_title}>Note</p>
              <p className={classes.Note_description}>
                Please bear in mind that in the photo may be slightly different
                from the actual item in terms of color due to the lighting
                conditions or the display you view
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.Container}>
          <BoxSpinner />
          <HeadingPrimarySlim>Loading...</HeadingPrimarySlim>
        </div>
      )}
    </Page>
  );
};

const mapStateToProps = (state, ownProps) => ({
  currentProduct: productByIdSelector(ownProps.match.params.product_id)(state),
  isFavorite: checkFavoriteProductListSelector(
    ownProps.match.params.product_id
  )(state),
  currentUserId: getCurrentUserId(state),
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addCartItem(item)),
  addToFavoriteList: (item) => dispatch(addToFavorite(item)),
  removeFromFavoriteList: (item) => dispatch(removeFromFavorite(item)),
  showNotification: (notification) => dispatch(showNotification(notification)),
  removeNotification: () => dispatch(removeNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
