import React from "react";

const Product = () => {
  return (
    <div className="flex items-center bg-white border-[3px] border-solid border-gray-300 rounded-md p-3 shadow-md w-1/4">
      <img src="https://picsum.photos/125/125" alt="" className="" />

      <div className="flex flex-col p-2">
        <h1 className="text-xl break-normal	text-ellipsis overflow-hidden whitespace-nowrap w-[275px]">
          Wireless Switch Controller for Nintendo Switch/Lite/OLED Controller,
          Switch Controller with a Mouse Touch Feeling on Back Buttons, Extra
          Switch Pro Controller with Wake-up,Programmable, Turbo Function
        </h1>
        <p>Desc</p>
        <div className="flex gap-2 text-lg">
          <p className="line-through">$20</p>
          <p>$30</p>
        </div>

        <a href=""> Link</a>
      </div>
    </div>
  );
};

export default Product;
