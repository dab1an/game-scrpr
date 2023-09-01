import { useEffect, useState } from "react";
import React from "react";
import Product from "../Components/Product";
import Loading from "../Components/Loading";

const fetchData = async function () {
  const response = await fetch("http://localhost:8001", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

const Home = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    async function fetch() {
      const data = await fetchData();
      setProducts(data);
      console.log(products);
    }
    fetch();
  }, []);

  if (!products || !products.length) {
    return (
      <div className="w-[50vw] h-[50vh]">
        {" "}
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex gap-2 w-screen">
      {products.map((product) => {
        <Product
          title={product.title}
          price={product.price}
          salePrice={product.salePrice}
          discount={product.discount}
          productImage={product.productImage}
        />;
      })}
    </div>
  );
};

export default Home;
