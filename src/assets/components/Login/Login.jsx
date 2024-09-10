import "./Login.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../routes/Protected/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("https://localhost:7187/api/Authentication/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Usuario o contraseña incorrecta");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Response data:", data); // Verifica la estructura de la respuesta
        if (data.token) {
          localStorage.setItem("token", data.token);
          login(username, data.token); // Pasa el token al login
          setError("");
          navigate("/");
        } else {
          throw new Error("Token no recibido");
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form className="login-container" onSubmit={submitLogin}>
      <img
        src="https://greatlakeslivin.com/cdn/shop/products/2A_1200x1200.png?v=1618200400"
        alt=""
      />
      <div className="inputs-container">
        <label htmlFor="">Usuario</label>
        <input type="text" value={username} onChange={handleUsername} />
        <label htmlFor="">Contraseña</label>
        <input type="password" value={password} onChange={handlePassword} />
        {error && <p className="error">{error}</p>}
      </div>
      {loading ? (
        <img src="src/images/spinner.svg" className="spinner" alt="" />
      ) : (
        <button className="start" disabled={!username || !password}>
          Iniciar
        </button>
      )}
    </form>
  );
};

export default Login;
