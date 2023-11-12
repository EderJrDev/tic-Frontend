// import React, { useState, useContext, useEffect } from "react";
// import { api } from "../utils/api.js";
// import { Navigate } from "react-router-dom";
// import { Modal, Button } from "react-bootstrap";
// import { AppSettings } from "../config/app-settings.js";

// function Login() {
//   const context = useContext(AppSettings);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [redirect, setRedirect] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   async function handleSubmit(event) {
//     event.preventDefault();
//     try {
//       const body = { email, password };
//       console.log(body);
//       const response = await api.post("/admin/user/auth", body);
//       const token = response.data.token;
//       const isAdmin = response.data.isAdmin;

//       console.log(response);

//       if (token) {
//         setRedirect(true);
//         localStorage.setItem("token", token);
//         localStorage.setItem("isAdmin", isAdmin);
//       } else {
//         setIsModalOpen(true);
//         setEmail("");
//         setPassword("");
//       }
//     } catch (e) {
//       setIsModalOpen(true);
//       setEmail("");
//       setPassword("");
//     }
//   }

//   useEffect(() => {
//     context.handleSetAppSidebarNone(true);
//     context.handleSetAppHeaderNone(true);
//     context.handleSetAppContentClass("p-0");

//     return () => {
//       context.handleSetAppSidebarNone(false);
//       context.handleSetAppHeaderNone(false);
//       context.handleSetAppContentClass("");
//     };
//   }, []);

//   if (redirect) {
//     return <Navigate to="/dashboard" />;
//   }

//   return (
//     <>
//       <div className="login login-v1">
//         <div className="login-container">
//           <div className="login-header">
//             <div className="brand">
//               <div className="d-flex align-items-center">
//                 <span className="logo"></span> <b>System </b> Admin
//               </div>
//               <small>
//                 Sistema Administrativo da Creche Nossa Senhora da Conceição
//               </small>
//             </div>
//             <div className="icon">
//               <i className="fa fa-lock"></i>
//             </div>
//           </div>
//           <div className="login-body">
//             <div className="login-content fs-13px">
//               <form onSubmit={handleSubmit}>
//                 <div className="form-floating mb-20px">
//                   <input
//                     type="email"
//                     className="form-control fs-13px h-45px"
//                     id="emailAddress"
//                     value={email}
//                     placeholder="Email Address"
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                   <label
//                     htmlFor="emailAddress"
//                     className="d-flex align-items-center py-0"
//                   >
//                     Email
//                   </label>
//                 </div>
//                 <div className="form-floating mb-20px">
//                   <input
//                     type="password"
//                     className="form-control fs-13px h-45px"
//                     id="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <label
//                     htmlFor="password"
//                     className="d-flex align-items-center py-0"
//                   >
//                     Senha
//                   </label>
//                 </div>
//                 <div className="form-check mb-20px">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     value=""
//                     id="rememberMe"
//                   />
//                   <label className="form-check-label" htmlFor="rememberMe">
//                     Lembre de mim
//                   </label>
//                 </div>
//                 <div className="login-buttons">
//                   <button
//                     type="submit"
//                     className="btn h-45px btn-success d-block w-100 btn-lg"
//                   >
//                     Entrar
//                   </button>
//                   <button
//                     id="button"
//                     data-bs-toggle="modal"
//                     data-bs-target="#modalAlert"
//                     className="d-none"
//                   >
//                     Demo
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Login Inválido</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="alert alert-danger">
//             <h5>
//               <i className="fa fa-info-circle"></i> Usuário ou senha inválidos
//             </h5>
//             <p>
//               Por favor, verifique seu usuário e senha e tente realizar o login
//               novamente.
//             </p>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
//             Fechar
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default Login;

import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { AppSettings } from "../config/app-settings.js";

import creche from "../assets/creche3.jpg";

const Login = () => {
  const context = React.useContext(AppSettings);

  useEffect(() => {
    context.handleSetAppSidebarNone(true);
    context.handleSetAppHeaderNone(true);
    context.handleSetAppContentClass("p-0");

    return () => {
      context.handleSetAppSidebarNone(false);
      context.handleSetAppHeaderNone(false);
      context.handleSetAppContentClass("");
    };
  }, [context]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // if (state.redirect) {
  //   return <Navigate to="/dashboard/v3" />;
  // }

  return (
    <React.Fragment>
      {" "}
      <div className="login login-v2 fw-bold">
        <div className="login-cover">
          <div
            className="login-cover-img"
            style={{
              backgroundImage: `url(${creche})`,
            }}
          ></div>
          <div className="login-cover-bg"></div>
        </div>

        <div className="login-container">
          {/* <div className="login-header">
            <div className="brand">
              <div className="d-flex align-items-center">
                <span className="logo"></span> <b>Color</b> Admin
              </div>
              <small>Bootstrap 5 Responsive Admin Template</small>
            </div>
            <div className="icon">
              <i className="fa fa-lock"></i>
            </div>
          </div> */}

          <div className="login-content">
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-20px">
                <input
                  type="text"
                  className="form-control fs-13px h-45px border-0"
                  placeholder="Email Address"
                  id="emailAddress"
                />
                <label
                  htmlFor="emailAddress"
                  className="d-flex align-items-center text-gray-600 fs-13px"
                >
                  Email Address
                </label>
              </div>
              <div className="form-floating mb-20px">
                <input
                  type="password"
                  className="form-control fs-13px h-45px border-0"
                  placeholder="Password"
                />
                <label
                  htmlFor="emailAddress"
                  className="d-flex align-items-center text-gray-600 fs-13px"
                >
                  Password
                </label>
              </div>
              <div className="form-check mb-20px">
                <input
                  className="form-check-input border-0"
                  type="checkbox"
                  value="1"
                  id="rememberMe"
                />
                <label
                  className="form-check-label fs-13px text-gray-500"
                  htmlFor="rememberMe"
                >
                  Lembre de Mim
                </label>
              </div>
              <div className="mb-20px">
                <button
                  type="submit"
                  className="btn btn-blue d-block w-100 h-45px btn-lg"
                >
                  Entrar
                </button>
              </div>
              {/* <div className="text-gray-500">
                Not a member yet? Click <Link to="/user/register-v3">here</Link>{" "}
                to register.
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
