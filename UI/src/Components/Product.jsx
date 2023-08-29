import React from "react";

const Product = ({ productImage, discount, title, price, salePrice, link }) => {
  return (
    <div className="flex items-center bg-white border-[3px] border-solid border-gray-300 rounded-md p-3 shadow-md w-[450px]">
      <img
        src={productImage || ""}
        alt=""
        className="rounded-sm h-[125px] w-[125px]"
      />

      <div className="flex flex-col p-2">
        <h1 className="text-xl multiline">{title || ""}</h1>
        <div className="w-1/6 flex justify-center bg-green-600 text-white rounded-md">
          <p>{discount || ""}%</p>
        </div>
        <div className="flex gap-2 text-lg pt-1">
          <p className="line-through">{price || ""}</p>
          <p>{salePrice || ""}</p>
        </div>
        <a href={link || ""} target="_blank" className="text-blue-500">
          Link
        </a>
      </div>
    </div>
  );
};

export default Product;
