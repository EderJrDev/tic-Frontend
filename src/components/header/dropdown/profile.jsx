import React from 'react';
import { Link } from 'react-router-dom';

class DropdownProfile extends React.Component {
	render() {
		return (
			<div className="navbar-item navbar-user dropdown">
				<a href="#/" className="navbar-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
					<img src="https://cdn.eutotal.com/imagens/frases-perfeitas-para-a-foto-de-perfil-cke.jpg" alt="Imagem de Perfil" /> 
					<span>
						<span className="d-none d-md-inline">Administrador</span>
						<b className="caret"></b>
					</span>
				</a>
				<div className="dropdown-menu dropdown-menu-end me-1">
					<a href="#/" className="dropdown-item">Grupo de Acesso</a>
					<a href="#/" className="dropdown-item">Configurações</a>
					{/* <div className="dropdown-divider"></div> */}
					<Link to='user' className="dropdown-item" >Sair</Link>
					{/* <a href="user">Sair</a> */}
				</div>
			</div>
		);
	}
};

export default DropdownProfile;
