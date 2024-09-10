import { Outlet } from "react-router-dom";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/sale");
  }, [navigate]);

  const handleSaleClick = () => {
    navigate("/sale");
  };

  const handleProductsClick = () => {
    navigate("/products");
  };

  const handleReportsClick = () => {
    navigate("/reports");
  };

  return (
    <div className="home-container">
      <div className="dropdown">
        <div>
          <img
            src="https://greatlakeslivin.com/cdn/shop/products/2A_1200x1200.png?v=1618200400"
            alt=""
          />
        </div>
        <nav className="links-container">
          <ul>
            <li onClick={handleSaleClick}>
              <img
                className="dashboard-icon"
                src="src/images/point_of_sale (1).png"
                alt=""
              />
              <a>Ventas</a>
            </li>
            <li onClick={handleProductsClick}>
              <img
                className="dashboard-icon"
                src="src/images/production_quantity_limits (1).png"
                alt=""
              />
              <a>Productos</a>
            </li>
            <li onClick={handleReportsClick}>
              <img
                className="dashboard-icon"
                src="src/images/lab_profile (1).png"
                alt=""
              />
              <a>Informes</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container-section">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Home;
