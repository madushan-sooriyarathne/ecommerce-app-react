import React from "react";

import useStyles from "../styles/components/CartItemStyles";

import sprites from "../img/svg/sprites.svg";

const CartItem = ({
  item,
  isPurchased = false,
  handleDelete = () => {},
  handleQtcChange = () => {},
}) => {
  const classes = useStyles({ isPurchased });

  const { id, imgURL, name, qtc, price, color, size } = item;

  const handleAdd = (event) => {
    const updatedItem = { ...item, qtc: qtc + 1 };
    handleQtcChange(id, updatedItem);
  };

  const handleMinus = (event) => {
    if (!(qtc <= 1)) {
      const updatedItem = { ...item, qtc: qtc - 1 };
      handleQtcChange(id, updatedItem);
    }
  };

  return (
    <div className={classes.CartItem}>
      <img src={imgURL} alt={name} className={classes.CartItem_img}></img>
      <div className={classes.CartItem_details}>
        <div className={classes.Details_main}>
          <p className={classes.Details_main_name}>{name}</p>
          {isPurchased ? (
            <div className={classes.Details_main_price_with_qtc}>
              <span className={classes.price_bold}>{`$ ${parseFloat(
                price
              ).toFixed(2)}`}</span>{" "}
              x <span className={classes.qtc_bold}>{qtc}</span>
            </div>
          ) : (
            <>
              {" "}
              <p className={classes.Details_main_price}>{`$ ${parseFloat(
                price
              ).toFixed(2)}`}</p>
              <div className={classes.Details_main_qtc}>
                <svg
                  className={`${classes.Qtc_btn} ${classes.Qtc_btn_minus} ${
                    qtc <= 1 && classes.Qtc_btn_disabled
                  }`}
                  onClick={handleMinus}
                  disabled={qtc <= 1}
                >
                  <use xlinkHref={`${sprites}#icon-minus`}></use>
                </svg>
                <span className={classes.Details_main_qtc_amount}>{qtc}</span>
                <svg
                  className={`${classes.Qtc_btn} ${classes.Qtc_btn_add}`}
                  onClick={handleAdd}
                >
                  <use xlinkHref={`${sprites}#icon-plus`}></use>
                </svg>
              </div>
            </>
          )}

          <p className={classes.Details_main_total}>{`$ ${(qtc * price).toFixed(
            2
          )}`}</p>
        </div>
        <div className={classes.Details_sub}>
          <p className={classes.Details_item_preference}>
            Color: {color.name.toUpperCase()} | Size: {size.toUpperCase()}
          </p>
          {!isPurchased && (
            <svg
              className={classes.Details_remove_btn}
              onClick={(event) => handleDelete(id)}
            >
              <use xlinkHref={`${sprites}#icon-delete`}></use>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
