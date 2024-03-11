import * as React from "react";


export default function ButtonUsage({ children, onClickHandler }) {
  return (
    <button
    className="bg-gray-50 px-3 py-1 rounded-full border-2 hover:bg-gray-300 outline-none"
    onClick={onClickHandler}
  >
    {children}
  </button>
  );
}
