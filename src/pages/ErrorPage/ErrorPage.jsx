import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppSettings } from "../../config/app-settings";

const ErrorPage = () => {
  const context = useContext(AppSettings);

  const navigate = useNavigate();

  const redirectToDashboardOrLogin = () => {
    try {
      // Simule a lógica de verificação para redirecionamento.
      const token = localStorage.getItem("token");

      if (token) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      // Se ocorrer um erro, redirecione para a página de login.
      navigate("/login");
    }
  };

  useEffect(() => {
    context.handleSetAppSidebarNone(true);
    context.handleSetAppHeaderNone(true);
    context.handleSetAppContentClass("p-0");

    return () => {
      context.handleSetAppSidebarNone(false);
      context.handleSetAppHeaderNone(false);
      context.handleSetAppContentClass("");
    };
  }, []);

  return (
    <div className="error">
      <div className="error-code">404</div>
      <div className="error-content">
        <div className="error-message">Não encontramos...</div>
        <div className="error-desc mb-4">
          Talvez você não tenha acesso a essa página, <br />
          ou ela não exista.
        </div>
        {/* <div>
          <Link to="/dashboard" className="btn btn-success px-3">Início</Link>
        </div> */}
        <button
          className="btn btn-success px-3"
          onClick={redirectToDashboardOrLogin}
        >
          Início
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
