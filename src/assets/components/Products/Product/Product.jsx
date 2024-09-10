/* eslint-disable react/prop-types */
import NewProduct from "../newProduct/NewProduct";
import "./Product.css";
import { useState } from "react";

const Product = ({ product, openModal, editProduct }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  // Función para mostrar el modal de edición
  const handleShowEdit = () => {
    setShowEditModal(true);
  };

  // Función para cerrar el modal de edición
  const handleCloseEdit = () => {
    setShowEditModal(false);
  };

  return (
    <div className="product-container">
      <div className="info-product">
        <p className="p-product">
          {product.name.charAt(0).toUpperCase() +
            product.name.slice(1).toLowerCase()}{" "}
        </p>
        <p className="p-product">${product.price}</p>
      </div>
      <div className="crud-product">
        <img
          onClick={handleShowEdit}
          className="crud-img"
          src="src/images/edit.png"
          alt="editar"
        />
        <img
          onClick={() => openModal(product)}
          className="crud-img"
          src="src/images/delete_forever.png"
          alt="eliminar"
        />
      </div>

      {showEditModal && (
        <NewProduct
          selectedProduct={product}
          handleCloseEdit={handleCloseEdit}
          editProduct={editProduct}
          type="edit"
        />
      )}
    </div>
  );
};

export default Product;
