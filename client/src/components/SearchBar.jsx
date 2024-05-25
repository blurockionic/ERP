import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ handleOnSearch }) => {
  return (
    <>
      <div className="m-2 w-10 sm:w-full md:w-[15rem] bg-white border rounded shadow-sm hidden md:inline sm:inline lg:inline">
        <SearchIcon className="ml-2" />
        <input
          className="px-3 py-2 h-auto sm:h-full md:h-full lg:h-full outline-none"
          type="search"
          onChange={(e) => handleOnSearch(e)}
          placeholder="Search Name..."
        />
      </div>
    </>
  );
};

export default SearchBar;
