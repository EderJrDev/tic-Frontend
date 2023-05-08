import React from 'react';
import { Panel, PanelHeader, PanelBody } from '../components/panel/panel.jsx';
import DataTable from 'react-data-table-component';

const columns = [
	{ name: 'Nome', selector: row => row.name, sortable: true },
	{ name: 'Uni. de Medida', selector: row => row.email, sortable: true },
	{ name: 'Localização', selector: row => row.address, sortable: true },
	{ name: 'Categoria', selector: row => row.categoria, sortable: true }
];

const data = [
	{ id: 1, name: 'Anne Nader', email: 'Rahul.Dare@hotmail.com', address: '4512 Nolan Brooks', categoria: 'Administrativo' },
	{ id: 2, name: 'Amber Leffler', email: 'Mia58@gmail.com', address: '405 Emmy Radial', categoria: 'Administrativo' },
	{ id: 3, name: 'Andres Bosco', email: 'Amir.Anderson@hotmail.com', address: '15853 Conroy Plains', categoria: 'Administrativo' },
]

const rowPreDisabled = row => row.disabled;
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

class Produtos extends React.Component {

	render() {
		return (
			<div>
				<h1 className="page-header">Estoque de Produtos</h1>
				<Panel>
					<PanelHeader>
						Produtos
					</PanelHeader>
					<PanelBody>
						<DataTable
							columns={columns}
							data={data}
							expandableRowDisabled={rowPreDisabled}
							expandableRowsComponent={ExpandedComponent}
							pagination />
					</PanelBody>

				</Panel>
			</div>
		)
	}
}

export default Produtos;