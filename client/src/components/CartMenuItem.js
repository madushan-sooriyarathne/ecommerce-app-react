import React, { memo } from "react";

import useStyles from "../styles/components/CartMenuItemStyles";

const CartMenuItem = ({ imgURL, name, qtc, price }) => {
  const classes = useStyles();
  return (
    <div className={classes.CartMenuItem}>
      <img className={classes.CartMenuItem_img} src={imgURL} alt={name}></img>
      <div className={classes.CartMenuItem_details}>
        <p className={classes.CartMenuItem_name}>{name}</p>
        <p className={classes.CartMenuItem_price}>{`${qtc} x $ ${price.toFixed(
          2
        )}`}</p>
      </div>
    </div>
  );
};

export default memo(CartMenuItem);
