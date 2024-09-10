import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

const Protected = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;
