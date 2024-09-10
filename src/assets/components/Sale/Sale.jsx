import { useContext, useState } from "react";
import { ProductsContext } from "../../services/products.services";
import "./Sale.css";
import {
  errorMessage,
  succesMessage,
} from "../SharedComponents/SweetAlert/SweetAlert";
const Sale = () => {
  const { productList } = useContext(ProductsContext);
  const [addSale, setAddSale] = useState([
    { quantity: 0, selectedProductId: null },
  ]);

  const onClickAddSale = () => {
    setAddSale([...addSale, { quantity: 0, selectedProductId: null }]);
  };

  const updateSale = (index, field, value) => {
    const newAddSale = [...addSale];
    newAddSale[index] = { ...newAddSale[index], [field]: value };
    setAddSale(newAddSale);
  };

  const removeSale = (index) => {
    const newAddSale = [...addSale];
    newAddSale.splice(index, 1);
    setAddSale(newAddSale);
  };

  const onClickSale = () => {
    const salesToPost = addSale.map((sale) => ({
      idProduct: parseInt(sale.selectedProductId),
      amount: parseInt(sale.quantity),
    }));

    fetch("https://localhost:7187/api/Sale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(salesToPost),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          errorMessage("Error al registrar la venta");
          throw new Error("Error al registrar la venta");
        }
        succesMessage("Venta registrada exitosamente");
        return res.text().then((text) => (text ? JSON.parse(text) : {}));
      })
      .then(() => {
        setAddSale([{ quantity: 0, selectedProductId: 1 }]);
      })
      .catch((error) => console.log(error));

    console.log(salesToPost);
  };

  return (
    <div className="sale-container">
      <div className="title-container">
        <h1>Registra tu venta</h1>
      </div>

      <div className="reverse">
        {addSale.map((sale, index) => (
          <div key={index} className="selected-container">
            <select
              name="Product"
              onChange={(e) =>
                updateSale(index, "selectedProductId", e.target.value)
              }
              value={sale.selectedProductId}
              className="select-product"
            >
              <option value="" className="option-product">
                Productos
              </option>
              {productList.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Cantidad"
              onChange={(e) => updateSale(index, "quantity", e.target.value)}
              value={sale.quantity}
            />
            <img
              src="src/images/delete_forever.png"
              alt="delete"
              onClick={() => removeSale(index)}
            />
          </div>
        ))}
      </div>
      <div className="add-sale" onClick={onClickAddSale}>
        <img src="src/images/add-sale.png" alt="add-sale" />
      </div>
      <button
        className="register-sale"
        onClick={onClickSale}
        disabled={addSale.some(
          (sale) =>
            !sale.selectedProductId ||
            !sale.quantity ||
            sale.quantity < 1 ||
            !sale.index === 1
        )}
      >
        Registrar
      </button>
    </div>
  );
};

export default Sale;
