import React from 'react';
import App from './../app.jsx';
import User from '../pages/User.jsx';
import Login from '../pages/Login.jsx';
import Produtos from '../pages/Produtos.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import CustomerOrder from '../pages/Pedidos/pedidos.jsx';

const AppRoute = [
	{
		path: '*',
		element: <App />,
		children: [
			{
				path: '',
				element: <User />
			},
			{
				path: 'dashboard',
				element: <Dashboard />
			},
			{
				path: 'produtos',
				element: <Produtos />,
			},
			{
				path: 'usuarios',
				element: <User />,
			},
			{
				path: 'pedidos',
				element: <CustomerOrder />,
			},
			{
				path: 'user',
				element: <Login />,
			}
		]
	}
];

export default AppRoute;