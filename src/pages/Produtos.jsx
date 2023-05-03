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
	{ id: 4, name: 'Elvira Bruen', email: 'Kariane11@gmail.com', address: '66784 Considine Islands', categoria: 'Administrativo' },
	{ id: 5, name: 'Paul Cole', email: 'Shannon_Beer@hotmail.com', address: '9110 Mann Route', categoria: 'Administrativo' },
	{ id: 6, name: 'Loretta Bednar', email: 'Kenyatta_Heller@hotmail.com', address: '97767 McDermott Freeway', categoria: 'Administrativo' },
	{ id: 7, name: 'Marcia Hauck', email: 'Joyce_Yost@gmail.com', address: '08173 Skyla Heights', categoria: 'Administrativo' },
	{ id: 8, name: 'Austin OKon III', email: 'Michele62@hotmail.com', address: '408 Jerde Place', categoria: 'Administrativo' },
	{ id: 9, name: 'Karen Murphy', email: 'Abigail96@gmail.com', address: '61596 OKon Stream', categoria: 'Administrativo' },
	{ id: 10, name: 'Nellie Luettgen V', email: 'Jeramie_Mosciski40@gmail.com', address: '24398 Conrad Haven', categoria: 'Administrativo' },
	{ id: 11, name: 'Tara Weimann', email: 'Tre_Heidenreich@hotmail.com', address: '105 Beahan River', categoria: 'Administrativo' },
	{ id: 12, name: 'Gina Treutel', email: 'Alisha95@gmail.com', address: '53821 Borer Light', categoria: 'Administrativo' },
	{ id: 13, name: 'Roberta Jaskolski', email: 'Barrett.Stamm@yahoo.com', address: '756 Lilyan Curve', categoria: 'Administrativo' },
	{ id: 14, name: 'Heather Terry', email: 'Orin_Hilll32@yahoo.com', address: '39951 Kirlin Crossing', categoria: 'Administrativo' },
	{ id: 15, name: 'Alfredo Kilback', email: 'Breana.Gleason@yahoo.com', address: '747 Jade Gardens', categoria: 'Administrativo' },
	{ id: 16, name: 'Mr. Eric Hoppe', email: 'Tyshawn_Carroll@gmail.com', address: '6044 Lola Rapid', categoria: 'Administrativo' },
	{ id: 17, name: 'Kellie Lueilwitz', email: 'Eryn48@hotmail.com', address: '833 Jada Freeway', categoria: 'Administrativo' },
	{ id: 18, name: 'Stacey Breitenberg', email: 'Jacklyn4@hotmail.com', address: '3574 Winifred Trace', categoria: 'Administrativo' },
	{ id: 19, name: 'Kristy Buckridge', email: 'Cali_Schulist93@yahoo.com', address: '732 Malinda Walk', categoria: 'Administrativo' },
	{ id: 20, name: 'Maureen Schaden', email: 'Clay.Gleichner@hotmail.com', address: '4161 Keara Lodge', categoria: 'Administrativo' },
	{ id: 21, name: 'Malcolm Schimmel', email: 'Dean.Gottlieb@gmail.com', address: '36619 Gottlieb Lights', categoria: 'Administrativo' },
	{ id: 22, name: 'Yvonne Carroll', email: 'Lavina_Sawayn@hotmail.com', address: '7624 Alf Plain', categoria: 'Administrativo' },
	{ id: 23, name: 'Hugh Emard', email: 'Erna_Streich51@gmail.com', address: '84938 Bette Mount', categoria: 'Administrativo' },
	{ id: 24, name: 'Alice Christiansen', email: 'Erika_Larson12@yahoo.com', address: '58814 Gene Trafficway', categoria: 'Administrativo' },
	{ id: 25, name: 'Blanche Kautzer', email: 'Brock_Bernhard@hotmail.com', address: '1431 Emory Freeway', categoria: 'Administrativo' },
	{ id: 26, name: 'Johnnie Gutkowski', email: 'Lexie43@gmail.com', address: '90789 Prince Mills', categoria: 'Administrativo' },
	{ id: 27, name: 'Sheila Thompson', email: 'Joel_Cartwright22@yahoo.com', address: '8915 Chadrick Wells', categoria: 'Administrativo' },
	{ id: 28, name: 'Edwin Krajcik', email: 'Ervin.Wyman34@yahoo.com', address: '0605 Koepp Fort', categoria: 'Administrativo' },
	{ id: 29, name: 'Barry Walsh', email: 'Vesta_Hauck93@hotmail.com', address: '4215 Wisozk Centers', categoria: 'Administrativo' },
	{ id: 30, name: 'Kyle Monahan', email: 'Sterling46@gmail.com', address: '290 Johnston Knoll', categoria: 'Administrativo' }
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