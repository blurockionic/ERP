import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({handleOnSearch}) => {
  return (
    <>
      <div className="m-2 h-[2rem] w-[15rem]  border border-black  ">
        <SearchIcon  className="ml-2" />

        <input
          className="p-2 h-full outline-none "
          type="search"
          name=""
          id=""
          onChange={(e)=>handleOnSearch(e)}
          placeholder="Search Name......"
        />
      </div>
    </>
  );
};

export default SearchBar;
