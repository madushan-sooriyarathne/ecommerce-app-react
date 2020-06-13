import React, { useState } from "react";
import { connect } from "react-redux";

import useInputState from "../hooks/UseInputState";

import SearchResultItem from "./SearchResultItem";

import useStyles from "../styles/components/SearchBarStyles";

import sprites from "../img/svg/sprites.svg";

const SearchBar = ({ productList }) => {
  // JSS Style hook
  const classes = useStyles();

  // State
  const [
    searchFieldText,
    updateSearchFieldText,
    resetSearchFieldText,
  ] = useInputState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultActive, toggleSearchResultActive] = useState(false);

  // Handle the search bar submit event
  const handleSearch = (event) => {
    event.preventDefault();

    if (searchFieldText !== "") {
      setSearchResult(
        productList.filter((product) =>
          product.name.toLowerCase().includes(searchFieldText)
        )
      );

      // toggle search results area
      toggleSearchResultActive(true);
    }
  };

  // Close the search result area and reset search field when
  // user click on a search result item
  const handleSearchItemClick = () => {
    toggleSearchResultActive(false);
    resetSearchFieldText();
  };

  // Close the search result area when user click outside of the component
  const handleSearchClose = () => {
    //close the overlay and search result tray
    toggleSearchResultActive(false);

    // clear the search field
    resetSearchFieldText();
  };

  return (
    <>
      <form className={classes.Search} onSubmit={handleSearch}>
        <input
          className={classes.Search_field}
          type="text"
          placeholder="Search"
          autoComplete="off"
          value={searchFieldText}
          onChange={updateSearchFieldText}
        ></input>

        <button type="submit" className={classes.Search_Btn}>
          <svg className={classes.Btn_svg}>
            <use xlinkHref={`${sprites}#icon-search`}></use>
          </svg>
        </button>
        <div
          className={`${classes.SearchResults} ${
            searchResultActive && classes.SearchResults_show
          }`}
        >
          {searchResult.length < 1 ? (
            <div className={classes.SearchResults_error}>
              Sorry! Nothing found
            </div>
          ) : (
            searchResult.map((result) => (
              <SearchResultItem
                name={result.name}
                price={result.price}
                id={result.id}
                image={result.imgURL}
                handleClose={handleSearchItemClick}
              />
            ))
          )}
        </div>
      </form>
      <div
        className={`${classes.Overlay} ${
          searchResultActive && classes.Overlay_show
        }`}
        onClick={handleSearchClose}
      >
        {" "}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  productList: state.productList.productList,
});

export default connect(mapStateToProps, null)(SearchBar);
