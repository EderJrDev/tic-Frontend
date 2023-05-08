import React from 'react';
import Calendar from 'react-calendar';
import { Panel, PanelHeader, PanelBody } from '../components/panel/panel.jsx';
import { AppSettings } from '../config/app-settings.js';
import 'react-calendar/dist/Calendar.css';

class Dashboard extends React.Component {
	static contextType = AppSettings;

	handleGetDate(minusDate) {
		var d = new Date();
		d = d.setDate(d.getDate() - minusDate);
		return d;
	};

	render() {
		this.map = {
			center: {
				lat: 59.95,
				lng: 30.33
			},
			zoom: 9
		}
		this.date = new Date();

		return (
			<div>
				<h1 className="page-header">Painel Principal <small>Administrativo Creche Nossa Senhora da Conceição</small></h1>
				<div className="row">
					<div className="col-xl-3 col-md-6">
						<div className="widget widget-stats bg-teal">
							<div className="stats-icon stats-icon-lg"><i className="fa fa-globe fa-fw"></i></div>
							<div className="stats-content">
								<div className="stats-title">Produtos</div>
								<div className="stats-number">7,842,900</div>
								<div className="stats-progress progress">
									<div className="progress-bar" style={{ width: '70.1%' }}></div>
								</div>
								<div className="stats-desc">Better than last week (70.1%)</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6">
						<div className="widget widget-stats bg-blue">
							<div className="stats-icon stats-icon-lg"><i className="fa fa-dollar-sign fa-fw"></i></div>
							<div className="stats-content">
								<div className="stats-title">Orçamentos</div>
								<div className="stats-number">180</div>
								<div className="stats-progress progress">
									<div className="progress-bar" style={{ width: '40.5%' }}></div>
								</div>
								<div className="stats-desc">Better than last week (40.5%)</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6">
						<div className="widget widget-stats bg-indigo">
							<div className="stats-icon stats-icon-lg"><i className="fa fa-archive fa-fw"></i></div>
							<div className="stats-content">
								<div className="stats-title">Pedidos</div>
								<div className="stats-number">38,900</div>
								<div className="stats-progress progress">
									<div className="progress-bar" style={{ width: '76.3%' }}></div>
								</div>
								<div className="stats-desc">Better than last week (76.3%)</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6">
						<div className="widget widget-stats bg-dark">
							<div className="stats-icon stats-icon-lg"><i className="fa fa-comment-alt fa-fw"></i></div>
							<div className="stats-content">
								<div className="stats-title">Categorias</div>
								<div className="stats-number">3,988</div>
								<div className="stats-progress progress">
									<div className="progress-bar" style={{ width: '54.9%' }}></div>
								</div>
								<div className="stats-desc">Better than last week (54.9%)</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xl-8">
						<Panel>
							<PanelHeader>Ultimos Pedidos</PanelHeader>
							<PanelBody>
								<div className="table-responsive">
									<table className="table table-striped mb-0">
										<thead>
											<tr>
												<th>Produto</th>
												<th>Status</th>
												<th>Data</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Arroz</td>
												<td>Aguardando</td>
												<td>01-07-2022</td>
											</tr>
											<tr>
												<td>Farinha</td>
												<td>Atrasado</td>
												<td>01-07-2022</td>
											</tr>
										</tbody>
									</table>
								</div>
							</PanelBody>
						</Panel>
					</div>
					<div className="col-xl-4">
						<Panel>
							<PanelHeader>
								Calendário
							</PanelHeader>
							<Calendar value={this.date} />
						</Panel>
					</div>
				</div>
			</div>
		)
	}
};

export default Dashboard;