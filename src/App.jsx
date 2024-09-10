import Login from "./assets/components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./assets/components/Home/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Protected from "./assets/routes/Protected/Protected";
import NotFound from "./assets/routes/NotFound/NotFound";
import { AuthProvider } from "./assets/routes/Protected/AuthContext";
import Sale from "./assets/components/Sale/Sale";
import Products from "./assets/components/Products/Products";
import Reports from "./assets/components/Reports/Reports";
import { ProductsProvider } from "./assets/services/products.services";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Protected />,
      children: [
        {
          path: "/",
          element: <Home />,
          children: [
            {
              path: "/sale",
              element: <Sale />,
            },
            {
              path: "/products",
              element: <Products />,
            },
            {
              path: "/reports",
              element: <Reports />,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <div>
      <AuthProvider>
        <ProductsProvider>
          <RouterProvider router={router} />
        </ProductsProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
