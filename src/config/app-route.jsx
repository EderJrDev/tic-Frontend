import React from 'react';
import App from './../app.jsx';
import DashboardV2 from './../pages/dashboard/dashboard-v2.js';
import PageBlank from './../pages/option/page-blank.js';
import LoginV1 from './../pages/user/login-v1.js';

const AppRoute = [
	{
		path: '*',
		element: <App />,
		children: [
			{
				path: '',
				element: <DashboardV2 />
			},
			{
				path: 'dashboard',
				element: <DashboardV2 />
			},
			{
				path: 'page-option',
				element: <PageBlank />,
			},
			{
				path: 'user',
				element: <LoginV1 />,
			}
		]
	}
];

export default AppRoute;