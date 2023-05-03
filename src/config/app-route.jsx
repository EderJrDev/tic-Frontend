import React from 'react';
import App from './../app.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Produtos from '../pages/Produtos.jsx';
import Login from '../pages/Login.jsx';

const AppRoute = [
	{
		path: '*',
		element: <App />,
		children: [
			{
				path: '',
				element: <Dashboard />
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
				path: 'user',
				element: <Login />,
			}
		]
	}
];

export default AppRoute;