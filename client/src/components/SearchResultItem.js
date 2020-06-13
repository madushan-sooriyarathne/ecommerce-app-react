import React from "react";
import { useHistory } from "react-router-dom";

import useStyles from "../styles/components/SearchResultItemStyles";

const SearchResultItem = ({ name, image, id, price, handleClose }) => {
  // JSS Style hook
  const classes = useStyles();

  // History hook
  const history = useHistory();

  const handleClick = () => {
    // close overlay and search results
    handleClose();

    // Redirect to product page
    history.push(`/product/${id}`);
  };

  return (
    <div className={classes.SearchResultItem} onClick={handleClick}>
      <img
        className={classes.SearchResultItem_Image}
        src={image}
        alt="Product Image"
      ></img>
      <div className={classes.SearchResultItem_details}>
        <p className={classes.Details_name}>{name}</p>
        <p className={classes.Details_price}>{`$ ${price}`}</p>
      </div>
    </div>
  );
};

export default SearchResultItem;
