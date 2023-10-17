import React, { useState, useContext, useEffect } from "react";
import { api } from "../utils/api.js";
import { Navigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { AppSettings } from "../config/app-settings.js";

function Login() {
  const context = useContext(AppSettings);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const body = { email, password };
      console.log(body);
      const response = await api.post("/admin/user/auth", body);
      const token = response.data.token;

      if (token) {
        setRedirect(true);
        localStorage.setItem("token", token);
      } else {
        setIsModalOpen(true);
        setEmail("");
        setPassword("");
      }
    } catch (e) {
      setIsModalOpen(true);
      setEmail("");
      setPassword("");
    }
  }

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

  if (redirect) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <div className="login login-v1">
        <div className="login-container">
          <div className="login-header">
            <div className="brand">
              <div className="d-flex align-items-center">
                <span className="logo"></span> <b>System </b> Admin
              </div>
              <small>
                Sistema Administrativo da Creche Nossa Senhora da Conceição
              </small>
            </div>
            <div className="icon">
              <i className="fa fa-lock"></i>
            </div>
          </div>
          <div className="login-body">
            <div className="login-content fs-13px">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-20px">
                  <input
                    type="email"
                    className="form-control fs-13px h-45px"
                    id="emailAddress"
                    value={email}
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="emailAddress"
                    className="d-flex align-items-center py-0"
                  >
                    Email
                  </label>
                </div>
                <div className="form-floating mb-20px">
                  <input
                    type="password"
                    className="form-control fs-13px h-45px"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label
                    htmlFor="password"
                    className="d-flex align-items-center py-0"
                  >
                    Senha
                  </label>
                </div>
                <div className="form-check mb-20px">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Lembre de mim
                  </label>
                </div>
                <div className="login-buttons">
                  <button
                    type="submit"
                    className="btn h-45px btn-success d-block w-100 btn-lg"
                  >
                    Entrar
                  </button>
                  <button
                    id="button"
                    data-bs-toggle="modal"
                    data-bs-target="#modalAlert"
                    className="d-none"
                  >
                    Demo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Inválido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-danger">
            <h5>
              <i className="fa fa-info-circle"></i> Usuário ou senha inválidos
            </h5>
            <p>
              Por favor, verifique seu usuário e senha e tente realizar o login
              novamente.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
