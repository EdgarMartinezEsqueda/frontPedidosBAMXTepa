import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

import HomePage from "./pages/home";
import ErrorPage  from "./pages/404";
import LoginPage from "./pages/login";
import SignInPage from "./pages/signIn";
import OrdersPage from "./pages/pedido/pedido";
import EditOrder from "./pages/pedido/editarPedido";
import NewOrder from "./pages/pedido/nuevoPedido";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);  // Cambia esto según tu lógica de autenticación

  const routes = [
    { path: "/", element: <HomePage />, requiresAuth: true },
    { path: "/login", element: <LoginPage setIsLoggedIn={setIsLoggedIn} />, requiresAuth: false },
    { path: "/registro", element: <SignInPage setIsLoggedIn={setIsLoggedIn} />, requiresAuth: false },
    { path: "/pedido/:id", element: <OrdersPage />, requiresAuth: true },
    { path: "/pedido/:id/editar", element: <EditOrder />, requiresAuth: true },
    { path: "/crearPedido", element: <NewOrder />, requiresAuth: true },
    { path: "*", element: <ErrorPage />, requiresAuth: true },
  ];

  return (
    <Router>
      <Routes>
        { routes.map( route => {
          return <Route
              key={ route.path }
              path={ route.path }
              element={ !isLoggedIn && route.requiresAuth ? <Navigate to="/login" /> : route.element }
            />
          } )}
      </Routes>
    </Router>
  );
}

export default App;
