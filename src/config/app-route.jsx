import React, { useEffect, useState } from "react";
import App from "./../app.jsx";
import User from "../pages/User.jsx";
import Login from "../pages/Login.jsx";
import Produtos from "../pages/Produtos.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import CustomerOrder from "../pages/Pedidos/pedidos.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
} from "react-router-dom";

// const AppRoute = [
// 	{
// 		path: '*',
// 		element: <App />,
// 		children: [
// 			{
// 				path: '',
// 				element: <Login />
// 			},
// 			{
// 				path: 'dashboard',
// 				element: <Dashboard />
// 			},
// 			{
// 				path: 'produtos',
// 				element: <Produtos />,
// 			},
// 			{
// 				path: 'usuarios',
// 				element: <User />,
// 			},
// 			{
// 				path: 'pedidos',
// 				element: <CustomerOrder />,
// 			},
// 			{
// 				path: 'user',
// 				element: <Login />,
// 			}
// 		]
// 	}
// ];

// export default AppRoute;

// Função para verificar a presença do token no localStorage

const IsUserLoggedIn = ({ children }) => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsUserLoggedIn(true);
      navigate("/dashboard"); // Redireciona para a página de login
    }
  }, [isUserLoggedIn]);

  if (isUserLoggedIn) {
    return children; // Renderiza o conteúdo protegido se o usuário estiver logado
  } else {
    return <RedirectToLogin />; // Redireciona para o login se o usuário não estiver logado
  }
};

// Componente de redirecionamento para login
const RedirectToLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/error"); // Redireciona para a página de login
  }, [navigate]);

  return null;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="error" element={<ErrorPage />} />
      {/* <Route path="/login/:id" element={<LoginWithId />} /> */}
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
      <Route
        path="usuarios"
        element={
          <IsUserLoggedIn>
            <User />
          </IsUserLoggedIn>
        }
      />
      <Route
        path="pedidos"
        element={
          <IsUserLoggedIn>
            <CustomerOrder />
          </IsUserLoggedIn>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

export default router;
