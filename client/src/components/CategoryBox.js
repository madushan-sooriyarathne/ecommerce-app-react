import React from "react";
import { useHistory } from "react-router-dom";

import useStyles from "../styles/components/CategoryBoxStyles";

const CategoryBox = ({ link, text, img }) => {
  const classes = useStyles({ img: img });

  // History hook
  const history = useHistory();

  return (
    <div className={classes.CategoryBox}>
      <div className={classes.BackgroundImageHolder}></div>
      <button
        className={classes.Btn}
        onClick={() => history.push(`/collection/${link}`)}
      >
        {text}
      </button>
    </div>
  );
};

export default CategoryBox;
