import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';

import { Card } from '../components/card/card.jsx';
import { InfoCards } from './Dashboard/InfoCards.jsx';
import { LastOrders } from './Dashboard/LastOrders.jsx';
import { Panel, PanelHeader, PanelBody } from '../components/panel/panel.jsx';

import ExportTable from '../components/button/ExportTable.jsx';

function Dashboard() {
	const [order, SetOrder] = useState();
	const [budget, Setbudget] = useState();
	const [category, SetCategory] = useState();
	const [products, Setproducts] = useState();
	const [tableData, setTableData] = useState([]);
	const [globalFilterValue, setGlobalFilterValue] = useState('');

	const onGlobalFilterChange = (e) => {
		setGlobalFilterValue(e.target.value);
	};

	const columns = [
		{ field: 'produtos', header: 'Número de Produtos' },
		{ field: 'status', header: 'Status' },
		{ field: 'data', header: 'Data' }
	];

	const exportColumns = columns.map((col) => ({ title: col.header, dataKey: col.field }));

	useEffect(() => {
		LastOrders(setTableData);
		InfoCards(Setproducts, Setbudget, SetOrder, SetCategory)
	}, [])

	return (
		<div>
			<h1 className="page-header">
				Painel Geral{' '}
				<small>
					Creche Nossa Senhora da Conceição
				</small>
			</h1>
			<div className="row">
				<Card
					title="Produtos"
					content={products}
					style="widget widget-stats bg-teal"
					icon={<i className="fa fa-globe fa-fw"></i>}
				/>
				<Card
					title="Orçamentos"
					content={budget}
					style="widget widget-stats bg-blue"
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
					style="widget widget-stats bg-dark"
					icon={<i className="fa fa-comment-alt fa-fw"></i>}
				/>
			</div>
			<div className="row">
				<div className="col-xl-12">
					<Panel>
						<PanelHeader className="bg-teal-700 text-white">Ultimos Pedidos</PanelHeader>
						<PanelBody>
							<ExportTable
								tableData={tableData}
								exportColumns={exportColumns}
								globalFilterValue={globalFilterValue}
								onGlobalFilterChange={onGlobalFilterChange}
							/>
							<DataTable
								rows={5}
								paginator
								stripedRows
								showGridlines
								value={tableData}
								sortMode="multiple"
								selectionMode="single"
								// totalRecords={tableData.length}
								globalFilter={globalFilterValue}
								rowsPerPageOptions={[10, 25, 50]}
								emptyMessage="Nenhuma informação encontrada."
								tableStyle={{ minWidth: '1rem', fontSize: '0.8rem' }}
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