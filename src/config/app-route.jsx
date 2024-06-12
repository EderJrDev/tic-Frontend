import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Route,
  useNavigate,
  createRoutesFromElements,
} from "react-router-dom";
//components
import App from "./../app.jsx";
import User from "../pages/User.jsx";
import Produtos from "../pages/Produtos.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Login from "../pages/Login.jsx";
import Budget from "../pages/Budget/Budget.jsx";
import CustomerOrder from "../pages/Pedidos/pedidos.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";

const isAdmin = localStorage.getItem("isAdmin");

// Função para verificar a presença do token no localStorage
const IsUserLoggedIn = ({ children }) => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsUserLoggedIn(true);
    } else {
      navigate("/error");
    }
  }, [isUserLoggedIn, navigate]);

  if (isUserLoggedIn) {
    return children; // Renderiza o conteúdo protegido se o usuário estiver logado
  } else {
    navigate("/error");
    // Redireciona para a página de login; // Redireciona para o login se o usuário não estiver logado
    return null;
  }
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/error" element={<ErrorPage />} />
      {/* Rotas protegida por login */}
      <Route
        path="dashboard"
        element={
          <IsUserLoggedIn>
            <Dashboard />
          </IsUserLoggedIn>
        }
      />
      <Route
        path="produtos"
        element={
          <IsUserLoggedIn>
            <Produtos />
          </IsUserLoggedIn>
        }
      />
      {isAdmin === "true" && (
        <Route
          path="usuarios"
          element={
            <IsUserLoggedIn>
              <User />
            </IsUserLoggedIn>
          }
        />
      )}

      <Route
        path="pedidos"
        element={
          <IsUserLoggedIn>
            <CustomerOrder />
          </IsUserLoggedIn>
        }
      />

      <Route
        path="budget"
        element={
          <IsUserLoggedIn>
            <Budget />
          </IsUserLoggedIn>
        }
      />

      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

export default router;
