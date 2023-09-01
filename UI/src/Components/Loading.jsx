import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="animate-spin flex justify-center items-center">
      <AiOutlineLoading3Quarters className="w-full h-full" />
    </div>
  );
};

export default Loading;
