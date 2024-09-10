import { useState, useContext, useRef } from "react";
import Product from "./Product/Product";
import "./Products.css";
import ModalConfirm from "../SharedComponents/ModalConfirm/ModalConfirm";
import NewProduct from "./newProduct/NewProduct";
import {
  errorMessage,
  succesMessage,
} from "../SharedComponents/SweetAlert/SweetAlert";
import { ProductsContext } from "../../services/products.services";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const { productList, setProductList, filteredProducts, setFilteredProducts } =
    useContext(ProductsContext);

  const inputSearch = useRef(null);

  const searchProduct = (e) => {
    const search = e.target.value.toLowerCase();

    if (search === "") {
      setFilteredProducts(productList);
    } else {
      const productsFiltered = productList.filter((product) =>
        product.name.toLowerCase().startsWith(search)
      );

      // Si no hay coincidencias al inicio, buscar en cualquier parte
      if (productsFiltered.length === 0) {
        const fallbackFiltered = productList.filter((product) =>
          product.name.toLowerCase().includes(search)
        );
        setFilteredProducts(fallbackFiltered);
      } else {
        setFilteredProducts(productsFiltered);
      }
    }
  };
  const handleDeleteProduct = (id) => {
    fetch(`https://localhost:7187/api/Product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          errorMessage("Error al eliminar el producto");
          throw new Error("Error al eliminar el producto");
        }
        succesMessage("Producto eliminado exitosamente");
        return res.text().then((text) => (text ? JSON.parse(text) : {}));
      })
      .then(() => {
        const productsFiltered = productList.filter(
          (product) => product.id !== id
        );
        setProductList(productsFiltered);
        setFilteredProducts(productsFiltered);
        console.log(productList);
        () => setShowDeleteModal(false); // Cierra el modal después de eliminar el producto
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editProduct = (updatedProduct) => {
    setProductList((prevProductList) =>
      prevProductList.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  return (
    <div className="container">
      <div className="title-container">
        <h1>Productos</h1>
      </div>
      <div className="search-and-add">
        <div className="input-div">
          <img
            className="search-img"
            src="src/images/search.png"
            alt="Buscar"
          />
          <input
            onChange={searchProduct}
            type="search"
            placeholder="Buscar Producto"
            ref={inputSearch}
          />
        </div>
        <button className="btn" onClick={() => setShowAddModal(true)}>
          Agregar Producto
        </button>
      </div>
      <div className="info-container">
        {productList.length === 0 ? (
          <p className="no-products">No hay productos registrados</p>
        ) : filteredProducts.length === 0 &&
          inputSearch.current?.value.length > 0 ? (
          <p className="no-products">
            No hay productos que coincidan con la búsqueda
          </p>
        ) : (
          (inputSearch.current?.value.length === 0
            ? productList
            : filteredProducts
          )
            .slice()
            .reverse()
            .map((product) => (
              <Product
                key={product.id}
                product={product}
                editProduct={editProduct}
                openModal={() => {
                  setSelectedProduct(product);
                  setShowDeleteModal(true);
                }}
              />
            ))
        )}
      </div>
      {showDeleteModal && selectedProduct && (
        <ModalConfirm
          show={showDeleteModal}
          nameProduct={selectedProduct.name}
          idProduct={selectedProduct.id}
          handleClose={() => setShowDeleteModal(false)}
          handleDelete={handleDeleteProduct}
        />
      )}
      {showAddModal && (
        <NewProduct handleCloseAdd={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default Products;
