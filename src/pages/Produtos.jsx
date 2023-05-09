import { Panel, PanelHeader, PanelBody } from "../components/panel/panel.jsx";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { api } from "../utils/api.js";

const data = [
  {
    nome: "",
    unid_medida: "",
    localizacao: "",
    categoria: "",
  },
];

function Produtos() {
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([
    // provavelmente não muda
    { name: "Nome", selector: (row) => row.nome, sortable: true },
    {
      name: "Unidade de medida",
      selector: (row) => row.unid_medida,
      sortable: true,
    },
    { name: "Localização", selector: (row) => row.localizacao, sortable: true },
    { name: "Categoria", selector: (row) => row.categoria, sortable: true },
  ]);

  async function getClients() {
    const response = await api.get("/admin/product");
    let dados = response.data;
	
    const data = dados.map(dado => ({
      nome: dado.name,
      unid_medida: dado.measure,
      localizacao: dado.location,
      categoria: dado.category.name,
    }));

    setTableData(data);
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div>
      <h1 className="page-header">Estoque de Produtos</h1>
      <Panel>
        <PanelHeader>Produtos</PanelHeader>
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
  );
}

export default Produtos;
