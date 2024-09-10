/* eslint-disable react/prop-types */
import "./NewProduct.css";
import { useState, useEffect, useContext } from "react";
import { ProductsContext } from "../../../services/products.services";

const NewProduct = ({
  handleCloseAdd,

  selectedProduct,

  handleCloseEdit,
  type,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const { addProduct, editProduct } = useContext(ProductsContext);

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setPrice(selectedProduct.price);
    }
  }, [selectedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: name,
      price: price,
    };
    fetch("https://localhost:7187/api/Product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al agregar producto");
        }
        return res.json();
      })
      .then((data) => {
        addProduct(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    handleCloseAdd();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const newEditProduct = {
      id: selectedProduct.id,
      name: name,
      price: price,
    };

    fetch(`https://localhost:7187/api/Product/${selectedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newEditProduct),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al editar producto");
        }
        return res.json();
      })
      .then((data) => {
        editProduct(data);
        console.log(data);
      });

    handleCloseEdit();
  };

  return (
    <div className="background">
      <div className="new-product-container">
        <h1 className="title">
          {type === "edit"
            ? `Editar ${
                selectedProduct.name.charAt(0).toUpperCase() +
                selectedProduct.name.slice(1).toLowerCase()
              }`
            : "Agregar Producto"}
        </h1>
        <form
          className="form"
          onSubmit={type === "edit" ? handleEdit : handleSubmit}
        >
          <label className="label" htmlFor="name">
            Nombre
          </label>
          {type === "edit" ? (
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="input"
              type="text"
              id="name"
              name="name"
              value={name}
            />
          ) : (
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="input"
              type="text"
              id="name"
              name="name"
            />
          )}
          <label className="label" htmlFor="price">
            Precio
          </label>
          {type === "edit" ? (
            <input
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className="input"
              type="number"
              id="price"
              name="price"
              value={price}
            />
          ) : (
            <input
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className="input"
              type="number"
              id="price"
              name="price"
            />
          )}
          <div className="btn-container-modal">
            <button
              className="btn-cancel"
              onClick={type === "edit" ? handleCloseEdit : handleCloseAdd}
            >
              Cancelar
            </button>
            <button className="btn-add" type="submit">
              {type === "edit" ? "Editar" : "Agregar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
