import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ handleOnSearch }) => {
  return (
    <>
      <div className="hidden md:inline sm:w-full  bg-white border border-gray-400  md:rounded-md lg:rounded-md p-0.5 ">
        <SearchIcon className="ml-2 cursor-pointer" />
        <input
          className=" h-auto sm:h-full md:h-full lg:h-full outline-none hidden md:inline sm:inline lg:inline"
          type="search"
          onChange={(e) => handleOnSearch(e)}
          placeholder="Search Name..."
        />
      </div>
    </>
  );
};

export default SearchBar;
