import React, { useState, useEffect, useMemo } from "react";
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';

import DataTable from "react-data-table-component";

import { api } from "../../utils/api";

const data = [{
    conta: "",
    nome: "",
    qtdBoleto: "",
    valorBoleto: "",
    status: ""
}];

function TableClients() {
    const [tableData, setTableData] = useState([]);
    const [tableColumns, setTableColumns] = useState([ // provavelmente não muda
        { name: 'Conta', selector: row => row.conta, sortable: true },
        { name: 'Cliente', selector: row => row.nome, sortable: true },
        { name: 'Boletos Pagos (QTD)', selector: row => row.qtdBoleto, sortable: true },
        { name: 'Boletos Pagos (R$)', selector: row => row.valorBoleto, sortable: true },
    ]);

    function getClients() {
        const response = api.get('client-acount-status');
        let dados = response.data

        const data = dados.map(dado => ({
            conta: dado.idvenda,
            nome: dado.nome_cli,
            qtdBoleto: dado.num_parcelas,
            valorBoleto: dado.valor_geral, 
        }));

        setTableData(data);
    }

    useEffect(() => {
        getClients();
    }, [])

    return (
        <div className="col-md-12">
            <Panel>
                <PanelHeader className="bg-teal-700 text-white">Clientes Ativos e Inativos</PanelHeader>
                <PanelBody>
                    <DataTable
                        columns={tableColumns}
                        data={tableData}
                        noHeader
                        defaultSortField="id"
                        defaultSortAsc={false}
                        pagination
                        highlightOnHover
                    />
                </PanelBody>
            </Panel>
        </div>
    )
}

export default TableClients;