import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';

import HomePage from "./pages/home";
import ErrorPage  from './pages/404';
import LoginPage from "./pages/login";
import SignInPage from "./pages/signIn";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // BORRAR ALV

  const routes = [
    { path: '/', element: <HomePage />, requiresAuth: true },
    { path: "/login", element: <LoginPage setIsLoggedIn={setIsLoggedIn} />, requiresAuth: false },
    { path: "/registro", element: <SignInPage setIsLoggedIn={setIsLoggedIn} />, requiresAuth: false },
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
