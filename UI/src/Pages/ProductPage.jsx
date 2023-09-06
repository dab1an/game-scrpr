import axios from "axios";
import React, { useState } from "react";
import Loading from "../Components/Loading";
import Product from "../Components/Product";

const ProductPage = () => {
  const [zip, setZip] = useState("");
  const [products, setProducts] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showZip, setShowZip] = useState(true);

  async function handleSubmit(e) {
    if (zip.length != 5) {
      alert("Zip Code should be 5 digits long!");
    }
    if (searchTerm == "" || searchTerm == null) {
      alert("Search is blank");
    } else {
      e.preventDefault();
      setIsLoading(true);
      setShowZip(false);
      axios
        .get(
          `http://localhost:8001/zip?paramZip=${zip}&searchTerm=${searchTerm}`
        )
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
  }

  return (
    <div className="flex flex-col justify-center h-screen w-[90%]">
      {showZip && (
        <div className="flex justify-center items-center w-full">
          <div className="  w-[40%] break-normal on-load h-full">
            <h1 className="text-[65px] font-bold txt-shadow">
              Forget the endless discount searching{" "}
            </h1>
            <h2 className="text-[21px]">
              Tell us what you're looking for and we'll do the rest.
            </h2>
            <br />
            <br />
            {/* <h3 className="text-gray-400">
              Just enter your zip code and the product you're trying to save on
            </h3> */}
          </div>

          <div className="flex justify-center items-center w-[60%] on-load-delay">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3 items-center justify-center">
                <input
                  type="text"
                  placeholder="Enter Zip Code"
                  className="pl-2 w-2/3 h-[60px] text-2xl rounded-md border border-gray-500  outline-none"
                  onChange={(e) => {
                    setZip(e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="Search"
                  className="pl-2 w-2/3 h-[60px] text-2xl rounded-md border border-gray-500  outline-none"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className=" bg-black text-white p-1 rounded-md w-1/3 text-2xl font-bold hover:bg-gray-100 hover:text-black hover:border-t hover:border-t-gray-500 hover:border-r hover:border-r-gray-500 hover:border-b hover:border-b-gray-500 hover:border-l hover:border-l-gray-500 "
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      )}

      <div className="flex flex-wrap flex-col items-center justify-center gap-3">
        {products && (
          <h1 className="text-2xl flex items-start">
            {" "}
            Found:
            <span className="font-bold"> {products.length} </span> Products
          </h1>
        )}
        <div className="flex flex-wrap gap-3 justify-center items-center">
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
                  link={product.link}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
