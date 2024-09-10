/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ProductsContext } from "../../services/products.services";
import "./Reports.css";
import { useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Reports = () => {
  const [report, setReport] = useState([]);
  const [reportByProduct, setReportByProduct] = useState("");
  const [view, setView] = useState(true);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [filteredDateButton, setFilteredDateButton] = useState(true);
  const [filteredMonthButton, setFilteredMonthButton] = useState(false);
  const [viewDate, setViewDate] = useState("month");
  const { productList } = useContext(ProductsContext);

  const formattedDate = calendarDate.toISOString().split("T")[0]; // Fecha formateada para uso en las solicitudes

  useEffect(() => {
    fetchReports(formattedDate);
    setView(true);
  }, []);

  const fetchReports = (date) => {
    fetch(`https://localhost:7187/api/Sale/by-date/${date}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReport(data);
        setView(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchMonthReports = (date) => {
    fetch(`https://localhost:7187/api/Sale/by-month/${date}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReport(data);
        setView(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const productReport = (id) => {
    fetch(`https://localhost:7187/api/Sale/by-product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReportByProduct(data);
        setView(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDateChange = (date) => {
    const today = new Date();
    if (date > today) {
      alert("No puedes seleccionar una fecha futura");
      return;
    }
    setCalendarDate(date);
    fetchReports(date.toISOString().split("T")[0]);
    setView(true);
    setFilteredDateButton(false);
  };

  const handleProductChange = (e) => {
    const id = e.target.value;
    productReport(id);
  };

  const handleViewChange = ({ activeStartDate, view }) => {
    setViewDate(view);
    if (viewDate === "month") {
      setCalendarDate(activeStartDate);
    }
    fetchMonthReports(activeStartDate.toISOString().split("T")[0].slice(0, 7));
    setView(true);
    setFilteredMonthButton(false);
  };

  return (
    <div className="reports-container">
      <div className="title-container">
        <h1>Reportes</h1>
      </div>
      <div className="filter-container">
        <button
          className="filter-button"
          onClick={() => {
            setFilteredMonthButton(!filteredMonthButton);
          }}
        >
          Filtrar por mes
        </button>
        <button
          className="filter-button"
          onClick={() => {
            setFilteredDateButton(!filteredDateButton);
          }}
        >
          Filtrar por dia
        </button>
        <select
          className="filter-button"
          name=""
          id=""
          onChange={handleProductChange}
        >
          <option value="">Filtrar por producto</option>
          {productList.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <h2>
        {view === false
          ? `Reporte de ventas del producto ${reportByProduct.productName}`
          : `Reportes de ventas del día ${
              calendarDate.toISOString().split("T")[0]
            }`}
      </h2>

      {view === false ? (
        <>
          {reportByProduct.id === 0 ? (
            <p className="no-sales">No hay ventas registradas</p>
          ) : (
            <>
              <div className="column-names">
                <p className="product-name-p">Producto</p>
                <p className="info-p">Cantidad</p>
                <p className="info-p">Precio</p>
                <p className="info-p">Total</p>
              </div>
              <div className="report-container">
                <p className="product-name-p"> {reportByProduct.productName}</p>
                <p className="info-p"> {reportByProduct.amount}</p>
                <p className="info-p">$ {reportByProduct.price}</p>
                <p className="info-p">$ {reportByProduct.total}</p>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {report.length === 0 ? (
            <p className="no-sales">No hay ventas registradas</p>
          ) : (
            <>
              <div className="column-names">
                <p className="product-name-p">Producto</p>
                <p className="info-p">Cantidad</p>
                <p className="info-p">Precio</p>
                <p className="info-p">Total</p>
              </div>
              {report.map((sale) => (
                <div key={sale.id} className="report-container">
                  <p className="product-name-p"> {sale.productName}</p>
                  <p className="info-p"> {sale.amount}</p>
                  <p className="info-p">$ {sale.price}</p>
                  <p className="info-p">$ {sale.total}</p>
                </div>
              ))}
              <p className="count-total">{`Total: $ ${report.reduce(
                (acc, sale) => acc + sale.total,
                0
              )}`}</p>
            </>
          )}
        </>
      )}

      {filteredDateButton && (
        <div className="calendar-container">
          <Calendar
            className={"calendar"}
            onChange={handleDateChange}
            value={calendarDate}
          ></Calendar>
        </div>
      )}
      {filteredMonthButton && (
        <div className="calendar-container">
          <Calendar
            className={"calendar"}
            value={calendarDate}
            onActiveStartDateChange={handleViewChange}
            view="year"
          ></Calendar>
        </div>
      )}
    </div>
  );
};

export default Reports;
