/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(productList);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://localhost:7187/api/Product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((dataProduct) => {
        setProductList(dataProduct);
        setFilteredProducts(dataProduct);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addProduct = (product) => {
    setProductList((prevProductList) => [...prevProductList, product]);
    setFilteredProducts((prevFilteredProducts) => [
      ...prevFilteredProducts,
      product,
    ]);
  };

  const editProduct = (updatedProduct) => {
    setProductList((prevProductList) =>
      prevProductList.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setFilteredProducts((prevFilteredProducts) =>
      prevFilteredProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  return (
    <ProductsContext.Provider
      value={{
        productList,
        setProductList,
        filteredProducts,
        setFilteredProducts,
        addProduct,
        editProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
