import React from 'react';
// import error from '../../utils/errors.js';
import { api } from '../utils/api.js';
import { Navigate } from 'react-router-dom';
import { AppSettings } from '../config/app-settings.js';
import { Modal, Button } from 'react-bootstrap';

class Login extends React.Component {
	static contextType = AppSettings;

	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);

		this.state = {
			redirect: false,
			email: '',
			password: '',
			isModalOpen: false
		}
	}

	componentDidMount() {
		this.context.handleSetAppSidebarNone(true);
		this.context.handleSetAppHeaderNone(true);
		this.context.handleSetAppContentClass('p-0');
	}

	componentWillUnmount() {
		this.context.handleSetAppSidebarNone(false);
		this.context.handleSetAppHeaderNone(false);
		this.context.handleSetAppContentClass('');
	}

	handleChangeEmail(event) {
		this.setState(state => ({
			email: event.target.value
		}));
	}

	handleChangePassword(event) {
		this.setState(state => ({
			password: event.target.value
		}));
	}

	async handleSubmit(event) {
		event.preventDefault();
		try {
			const email = this.state.email
			const password = this.state.password
			const body = { email, password };

			const response = await api.post('/auth', body);

			const token = response.data.token

			// console.log(token)

			if (token) {
				this.setState(state => ({
					redirect: true
				}))
			} else {
				this.setState({ isModalOpen: true });
				this.setState({ email: "", password: "" });

			}

		} catch (e) {
			this.setState({ isModalOpen: true });
			this.setState({ email: "", password: "" });
			// throw new Error(error.invalidLogin);
		}
	}

	render() {
		if (this.state.redirect) {
			return <Navigate to='/dashboard' />;
		}
		return (
			<>
				<div className="login login-v1">
					<div className="login-container">
						<div className="login-header">
							<div className="brand">
								<div className="d-flex align-items-center">
									<span className="logo"></span> <b>System</b> Admin
								</div>
								<small>Creche Nossa Senhora Da Conceição</small>
							</div>
							<div className="icon">
								<i className="fa fa-lock"></i>
							</div>
						</div>
						<div className="login-body">
							<div className="login-content fs-13px">
								<form onSubmit={this.handleSubmit}>
									<div className="form-floating mb-20px">
										<input type="email" className="form-control fs-13px h-45px" id="emailAddress" placeholder="Email Address" onChange={this.handleChangeEmail} value={this.state.email} />
										<label htmlFor="emailAddress" className="d-flex align-items-center py-0">Email</label>
									</div>
									<div className="form-floating mb-20px">
										<input type="password" className="form-control fs-13px h-45px" id="password" placeholder="Password" onChange={this.handleChangePassword} value={this.state.password} />
										<label htmlFor="password" className="d-flex align-items-center py-0">Senha</label>
									</div>
									<div className="form-check mb-20px">
										<input className="form-check-input" type="checkbox" value="" id="rememberMe" />
										<label className="form-check-label" htmlFor="rememberMe">
											Lembre de Mim
										</label>
									</div>
									<div className="login-buttons">
										<button type="submit" className="btn h-45px btn-success d-block w-100 btn-lg">Entrar</button>
										<button id='button' data-bs-toggle="modal" data-bs-target="#modalAlert" className="d-none"></button>

									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<Modal show={this.state.isModalOpen} onHide={() => this.setState({ isModalOpen: false })}>
					<Modal.Header closeButton>
						<Modal.Title>Login Inválido</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="alert alert-danger">
							<h5><i className="fa fa-info-circle"></i> Usuário ou senha inválidos</h5>
							<p>Por favor, verifique seu usuário e senha e tente realizar o login novamente.</p>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => this.setState({ isModalOpen: false })}>Fechar</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

export default Login;