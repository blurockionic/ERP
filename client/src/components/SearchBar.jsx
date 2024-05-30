import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ handleOnSearch }) => {
  return (
    <>
      <div className="m-2 w-10 sm:w-full md:w-[15rem] bg-white md:border lg:border md:rounded lg:rounded md:shadow-sm lg:shadow-sm">
        <SearchIcon className="ml-2 cursor-pointer" />
        <input
          className="px-3 py-2 h-auto sm:h-full md:h-full lg:h-full outline-none hidden md:inline sm:inline lg:inline"
          type="search"
          onChange={(e) => handleOnSearch(e)}
          placeholder="Search Name..."
        />
      </div>
    </>
  );
};

export default SearchBar;
