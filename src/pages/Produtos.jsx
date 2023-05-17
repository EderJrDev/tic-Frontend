import { Panel, PanelHeader, PanelBody } from "../components/panel/panel.jsx";
import React, { useState, useEffect } from "react";
import { api } from "../utils/api.js";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

function Produtos() {
  const [tableData, setTableData] = useState([]);

  const [dialogVisible, setDialogVisible] = useState(false);

  const tableColumns = [
    { field: 'nome', header: 'Nome' },
    { field: 'unid_medida', header: 'Unidade de medida' },
    { field: 'localizacao', header: 'Localização' },
    { field: 'categoria', header: 'Categoria' }
  ];

  async function getClients() {
    const response = await api.get("/admin/product");
    let dados = response.data;

    const data = dados.map(dado => ({
      id: dado.id,
      nome: dado.name,
      unid_medida: dado.measure.unit_measure,
      localizacao: dado.location,
      quantity: dado.quantity,
      categoria: dado.category.name,
    }))

    setTableData(data);
  }

  // function handleAprovarSaque() {
  // }

  const handleEditar = (event) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    setDialogVisible(true); // Abre a modal
  };

  useEffect(() => {
    getClients();
  }, []);

  const [dado, setDado] = useState('');

  return (
    <div>
      <h1 className="page-header">Estoque de Produtos</h1>
      <Panel>
        <PanelHeader className="bg-teal-700 text-white">Produtos</PanelHeader>
        <PanelBody>
          <div className="card">
            <form method="put">
              <DataTable
                paginator rows={5}
                rowsPerPageOptions={[5, 25, 50]}
                sortMode="multiple"
                value={tableData}
                editMode="row"
                // dataKey="id"
                selectionMode="single"
                showGridlines
                stripedRows
                tableStyle={{ minWidth: '1rem', fontSize: '0.8rem' }}
              >
                {tableColumns.map(({ field, header }) => {
                  return <Column key={field} field={field} header={header} style={{ width: '25%' }} />;
                })}
                <Column
                  header="Ações"
                  body={(rowData) => (
                    <Button
                      label="Editar"
                      onClick={handleEditar} // Usa o novo manipulador de eventos
                      className="btn btn-info"
                    />
                  )}
                />
              </DataTable>
              <Dialog header="Editar Produtos"
                visible={dialogVisible}
                style={{ width: '75vw' }}
                maximizable
                modal
                contentStyle={{ height: '300px' }}
                onHide={() => setDialogVisible(false)}
              >
                <div className="row">
                  <div className='col-6'>
                    <p className='m-auto pb-2'>Nome</p>
                    <input className="form-control form-control" type="text"  value={dado} onChange={e => setDado(e.target.value)} />
                  </div>
                  <div className='col-6'>
                    <p className='m-auto pb-2'>Unidade de medida</p>
                    <input className="form-control form-control" type="text" />
                  </div>
                </div>
                <div className="row py-3">
                  <div className='col-6'>
                    <p className='m-auto pb-2'>Localização</p>
                    <input className="form-control form-control" type="text" />
                  </div>
                  <div className='col-6'>
                    <p className='m-auto pb-2'>Categoria</p>
                    <input className="form-control form-control" type="text" />
                  </div>
                </div>
                <div className="py-3 text-end">
                  <Button
                    label="Atualizar"
                    // onClick={handleEditar} // Usa o novo manipulador de eventos
                    className="btn btn-info"
                  />
                </div>
              </Dialog>
            </form>
          </div>
        </PanelBody>
      </Panel>
    </div >
  );
}

export default Produtos;
