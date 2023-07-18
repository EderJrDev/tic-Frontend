// import React, { useState } from 'react';
// import React, { useState, useEffect } from "react";

import Calendar from 'react-calendar';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';

import { Panel, PanelHeader, PanelBody } from '../components/panel/panel.jsx';
import { api } from '../utils/api.js';
// import { AppSettings } from '../config/app-settings.js';;;;;;
import 'react-calendar/dist/Calendar.css';
import { downloadCSV } from "../utils/export.js";
import { useEffect, useState } from 'react';
import { Card } from '../components/card/card.jsx';

function Dashboard() {
	const date = new Date();
	const [products, Setproducts] = useState();
	const [budget, Setbudget] = useState();
	const [order, SetOrder] = useState();
	const [category, SetCategory] = useState();

	const onGlobalFilterChange = (e) => {
		setGlobalFilterValue(e.target.value);
	};

	const [tableData, setTableData] = useState([]);
	const [globalFilterValue, setGlobalFilterValue] = useState('');
	const columns = [
		{ field: 'produtos', header: 'Número de Produtos' },
		{ field: 'status', header: 'Status' },
		{ field: 'data', header: 'Data' }
	];

	useEffect(() => {
		async function getProducts() {
			const response = await api.get("/admin/order/latest");
			let dados = response.data;
			let getOrders = dados.orders;
			console.log(response);

			const data = getOrders.map(dado => ({
				// id: dado.id
				status: dado.status,
				produtos: dado.quant,
				data: new Date(dado.expected_date).toLocaleDateString('pt-BR')

				// quantity: dado.quantity,
				// location: dado.location,
				// category: dado.category.name,
				// measure: dado.measure.unit_measure,
			}))
			setTableData(data);
		}
		getProducts();
	}, [])


	async function getClients() {
		const getProducts = await api.get("/admin/product");
		let products = getProducts.data
		let productsCont = products.length
		Setproducts(productsCont)

		const getBudget = await api.get("/admin/budget");
		let budget = getBudget.data
		let budgetCont = budget.length
		Setbudget(budgetCont)

		const getOrder = await api.get("/admin/order");
		let order = getOrder.data
		let ordersCont = order.length
		SetOrder(ordersCont)

		const getCategory = await api.get("/admin/category");
		let category = getCategory.data
		let categoriesCont = category.length
		SetCategory(categoriesCont)
	}
	getClients();

	return (
		<div>
			<h1 className="page-header">
				Painel Principal
				<small>
					Administrativo Creche Nossa Senhora da Conceição
				</small>
			</h1>
			<div className="row">
				<Card
					title="Produtos"
					content={products}
					style={"widget widget-stats bg-teal"}
					icon={<i className="fa fa-globe fa-fw"></i>}
				/>
				<Card
					title="Orçamentos"
					content={budget}
					style={"widget widget-stats bg-blue"}
					icon={<i className="fa fa-dollar-sign fa-fw"></i>}
				/>
				<Card
					title="Pedidos"
					content={order}
					style={"widget widget-stats bg-indigo"}
					icon={<i className="fa fa-archive fa-fw"></i>}
				/>
				<Card
					title="Categorias"
					content={category}
					style={"widget widget-stats bg-dark"}
					icon={<i className="fa fa-comment-alt fa-fw"></i>}
				/>
			</div>
			<div className="row">
				<div className="col-xl-12">
					<Panel>
						<PanelHeader className="bg-teal-700 text-white">Ultimos Pedidos</PanelHeader>
						<PanelBody>
							<div>
								<div className="d-flex justify-content-end px-2 py-3">
									<span className="p-input-icon-left mx-2">
										<i className="bi bi-search"></i>
										<InputText
											value={globalFilterValue}
											onChange={onGlobalFilterChange}
											placeholder="Pesquisar"
										/>
									</span>
									<button
										className="btn btn-info"
										onClick={() => downloadCSV(tableData)}>
										<i className="bi bi-arrow-bar-up"></i>
										Exportar
									</button>
								</div>
								<div className="card">
									<DataTable
										paginator
										stripedRows
										showGridlines
										filterMode="global"
										sortMode="multiple"
										selectionMode="single"
										rows={10}
										rowsPerPageOptions={[10, 25, 50]}
										value={tableData}
										// totalRecords={tableData.length}
										globalFilter={globalFilterValue}
										tableStyle={{ minWidth: '1rem', fontSize: '0.8rem' }}
										emptyMessage="Nenhuma informação encontrada."
									>
										{columns.map((col, i) => (
											<Column
												sortable
												key={col.field}
												field={col.field}
												header={col.header}
												filterMatchMode={FilterMatchMode.CONTAINS}
											/>
										))}
									</DataTable>
								</div>
							</div>
						</PanelBody>
					</Panel>
				</div>
				{/* <div className="col-xl-4">
					<Panel>
						<PanelHeader>
							Calendário
						</PanelHeader>
						<Calendar value={date} />
					</Panel>
				</div> */}
			</div>
		</div>
	)
}

export default Dashboard;