import React from "react";
import { AiFillGithub } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="w-full h-[70px]  flex  items-center bg-white justify-between p-8 absolute top-0">
      <div>
        <h1 className="text-black font-bold text-2xl drop-shadow-2xl on-load-nav">
          game-scrpr
        </h1>
      </div>
      <div className="flex items-center pr-3 on-load-nav">
        <a href="https://github.com/dab1an/game-scrpr" target="_blank">
          <AiFillGithub size={38} />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
