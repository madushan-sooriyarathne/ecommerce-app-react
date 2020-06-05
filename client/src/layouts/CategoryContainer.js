import React from "react";

import CategoryBox from "../components/CategoryBox";

import useStyles from "../styles/layouts/CategoryContainerStyles";

import imgMen from "../img/category-men.jpg";
import imgWomen from "../img/category-women.jpg";
import imgSport from "../img/category-sport.jpg";

const CategoryContainer = () => {
  const classes = useStyles();
  return (
    <div className={classes.CategoryContainer}>
      <CategoryBox link="/men" img={imgMen} text="Men" />
      <CategoryBox link="/women" img={imgWomen} text="Women" />
      <CategoryBox link="/sport" img={imgSport} text="Sport" />
    </div>
  );
};

export default CategoryContainer;
