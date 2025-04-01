import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";

import PageTitle from "./components/title/PageTitle";
import HomePage from "./pages/home";
import ErrorPage  from "./pages/404";
import LoginPage from "./pages/login";
import SignInPage from "./pages/signIn";
import OrdersPage from "./pages/pedido/pedido";
import EditOrder from "./pages/pedido/editarPedido";
import NewOrder from "./pages/pedido/nuevoPedido";

import { useAuth } from "context/AuthContext";

function App() {
  const { user, loading } = useAuth();

  const routes = [
    { path: "/", element: <HomePage />, requiresAuth: true, title: "Inicio", allowedRoles: ["Direccion", "Ts", "Almacen"] },
    { path: "/login", element: <LoginPage />, requiresAuth: false, title: "Iniciar sesión"},
    { path: "/registro", element: <SignInPage />, requiresAuth: false, title: "Registro de usuario"},
    { path: "/pedido/:id", element: <OrdersPage />, requiresAuth: true, title: "Pedido", allowedRoles: ["Direccion", "Ts", "Almacen"] },
    { path: "/pedido/:id/editar", element: <EditOrder />, requiresAuth: true, title: "Editar Pedido", allowedRoles: ["Direccion", "Ts"] },
    { path: "/crearPedido", element: <NewOrder />, requiresAuth: true, title: "Crear Pedido", allowedRoles: ["Direccion", "Ts"] },
    { path: "*", element: <ErrorPage />, requiresAuth: true, title: "Ha surgido un error", allowedRoles: ["Direccion", "Ts", "Almacen"] },
  ];

  if (loading) {
    return <div>Cargando...</div>; // Muestra un spinner aquí
  }

  const checkAccess = (route, user) => {
    if (route.requiresAuth && !user) return false;
    if (route.allowedRoles && !route.allowedRoles.includes(user?.data.rol)) return false;
    return true;
  };

  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              user && ["/login", "/registro"].includes(route.path) ? (
                <Navigate to="/" replace />
              ) : !checkAccess(route, user) ? (
                <Navigate to={user ? "/" : "/login"} replace />
              ) : (
                <PageTitle title={route.title}>{route.element}</PageTitle>
              )
            }
          />
        ))}
      </Routes>
      <Toaster position="bottom-right" />
    </Router>
  );
}

export default App;
