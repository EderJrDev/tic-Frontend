import React from "react";
//components

// img
import img from "../../../assets/default.jpg";
import { useNavigate } from "react-router-dom";

function DropdownProfile() {
  const navigate = useNavigate();

  // let user = localStorage.getItem("name");
  let getPhoto = localStorage.getItem("photo");
  const photo = getPhoto ? getPhoto : img;

  const logoutFunction = async () => {
    localStorage.clear();

    navigate("/login");
  };

  return (
    <div className="navbar-item navbar-user dropdown">
      <a
        href="#/"
        className="navbar-link dropdown-toggle d-flex align-items-center"
        data-bs-toggle="dropdown"
      >
        <img src={photo} alt="Foto de Perfil" />
        <span>
          {/* <span className="d-none d-md-inline">Administrador</span> */}
          <b className="caret"></b>
        </span>
      </a>
      <div className="dropdown-menu dropdown-menu-end  px-2">
        <div>
          <h6 onClick={logoutFunction} className="dropdown-item">
            Sair <i className="bi bi-box-arrow-right"></i>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default DropdownProfile;
