import { useEffect, useState } from "react";
import React from "react";
import Product from "../Components/Product";

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

  useEffect(function () {
    async function fetch() {
      const data = await fetchData();
      setProducts(data);
      console.log(products);
    }
    fetch();
  }, []);

  if (!products || !products.length) {
    return <p>loading</p>;
  }

  return (
    <div>
      {products.map(function (product) {
        <Product
          title={product.title}
          price={product.price}
          salePrice={product.salePrice}
          percentOff={product.discount}
          productImage={product.productImage}
        />;
      })}
    </div>
  );
};

export default Home;
