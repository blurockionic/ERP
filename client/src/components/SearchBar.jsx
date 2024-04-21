import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({handleOnSearch}) => {
  return (
    <>
      <div className="m-2 w-[15rem]  border rounded shadow-sm ">
        <SearchIcon  className="ml-2" />
        <input
          className="px-3 py-2 h-full outline-none"
          type="search"
          onChange={(e)=>handleOnSearch(e)}
          placeholder="Search Name..."
        />
      </div>
    </>
  );
};

export default SearchBar;
