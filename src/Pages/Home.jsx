import React from "react";

function handleSubmit() {}

const Home = () => {
  return (
    <div className=" p-2 flex justify-center items-center h-24">
      <form onSubmit={handleSubmit} className="flex w-full">
        <div className="flex">
          <input
            type="text"
            placeholder="Enter Zip Code"
            className="pl-7 w-2/3 h-[60px] text-2xl rounded-tl-md rounded-bl-md border border-gray-500 border-r-0 outline-none"
          />
          <button
            type="submit"
            className=" bg-black text-white p-1 rounded-tr-md rounded-br-md w-1/3 text-2xl font-bold border-gray-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
