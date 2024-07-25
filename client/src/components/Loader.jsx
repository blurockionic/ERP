import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen w-full z-50 ">
        <span>
          <Loader2 className="animate-spin" />
        </span>
        <span className="text-black">Please wait...</span>
      </div>
    </>
  );
};

export default Loader;
