import React from "react";
import { MdSearch } from "react-icons/md";
import "../styles/searchBar.css";

function Search(props) {
  return (
    <div className="search">
      <MdSearch className="search-icons" size="1.3em" />
      <input
        value={props.searchText}
        onChange={(event) => props.setSeacrhTet(event.target.value)}
        type="text"
        placeholder="type to search..."
      />
    </div>
  );
}

export default Search;
