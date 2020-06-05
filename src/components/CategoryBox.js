import React from "react";

import useStyles from "../styles/components/CategoryBoxStyles";

const CategoryBox = ({ link, text, img }) => {
  const classes = useStyles({ img: img });
  return (
    <div className={classes.CategoryBox}>
      <div className={classes.BackgroundImageHolder}></div>
      <button className={classes.Btn}>{text}</button>
    </div>
  );
};

export default CategoryBox;
