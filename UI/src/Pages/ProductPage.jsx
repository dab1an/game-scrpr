import axios from "axios";
import React, { useState } from "react";
import Loading from "../Components/Loading";
import Product from "../Components/Product";

const ProductPage = () => {
  const [zip, setZip] = useState("");
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    axios
      .get(`http://localhost:8001/zip?paramZip=${zip}`)
      .then((res) => {
        console.log(res.data.scraperData);
        setProducts(res.data.scraperData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(zip);
  }

  return (
    <>
      {!products && (
        <div className=" p-2 flex justify-center items-center h-24">
          <form onSubmit={handleSubmit} className="flex w-full">
            <div className="flex">
              <input
                type="text"
                placeholder="Enter Zip Code"
                className="pl-7 w-2/3 h-[60px] text-2xl rounded-tl-md rounded-bl-md border border-gray-500 border-r-0 outline-none"
                onChange={(e) => {
                  setZip(e.target.value);
                }}
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
      )}
      {isLoading && <Loading />}

      {products &&
        products.map((product) => {
          console.log(product);
          return (
            <Product
              title={product.title}
              price={product.price}
              salePrice={product.salePrice}
              discount={product.discount}
              productImage={product.productImage}
            />
          );
        })}
    </>
  );
};

export default ProductPage;
