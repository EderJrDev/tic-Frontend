import { api } from "../utils/api.js";
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import React, { useState, useEffect } from "react";
import { Panel, PanelHeader, PanelBody } from "../components/panel/panel.jsx";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

function Produtos() {
  const [tableData, setTableData] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [name, setNome] = useState('');
  const [quantity, setQuantidade] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [categoria, setCategoria] = useState('');

  const tableColumns = [
    { field: 'name', header: 'Nome' },
    { field: 'unid_medida', header: 'Unidade de medida' },
    { field: 'localizacao', header: 'Localização' },
    { field: 'quantity', header: 'Quantidade' },
    { field: 'categoria', header: 'Categoria' }
  ];

  async function getClients() {
    const response = await api.get("/admin/product");
    let dados = response.data;

    const data = dados.map(dado => ({
      id: dado.id,
      name: dado.name,
      unid_medida: dado.measure.unit_measure,
      localizacao: dado.location,
      quantity: dado.quantity,
      categoria: dado.category.name,
    }))
    setTableData(data);
  }

  const handleEditar = (event, rowData) => {
    console.log(rowData);
    setNome(rowData.name);
    setUnidadeMedida(rowData.unid_medida);
    setLocalizacao(rowData.localizacao);
    setCategoria(rowData.categoria);
    setQuantidade(rowData.quantity)
    setDialogVisible(true);
  };
  const handleAtualizar = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: name,
      unid_medida: unidadeMedida,
      localizacao: localizacao,
      categoria: categoria,
      quantity: quantity
    };

    console.log(updatedData)

    // const response = await api.put(`/admin/product/:id}`, updatedData);

    // console.log(response);

    setDialogVisible(false); // Fecha a modal após a atualização
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div>
      <h1 className="page-header">Estoque de Produtos</h1>
      <Panel>
        <PanelHeader className="bg-teal-700 text-white">Produtos</PanelHeader>
        <PanelBody>
          <div className="card">
            <DataTable
              paginator rows={5}
              rowsPerPageOptions={[5, 25, 50]}
              sortMode="multiple"
              value={tableData}
              editMode="row"
              dataKey="id"
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
                    onClick={(e) => handleEditar(e, rowData)}
                    className="btn btn-info"
                  />
                )}
              />
            </DataTable>
            <Dialog
              modal
              maximizable
              header="Editar Produtos"
              visible={dialogVisible}
              style={{ width: '75vw' }}
              contentStyle={{ height: '300px' }}
            >
              <div className="row">
                <div className='col-6'>
                  <p className='m-auto pb-2'>Nome</p>
                  <input className="form-control form-control" type="text" value={name}
                    onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className='col-6'>
                  <p className='m-auto pb-2'>Unidade de medida</p>
                  <input
                    className="form-control form-control"
                    type="text"
                    value={unidadeMedida}
                    onChange={(e) => setUnidadeMedida(e.target.value)}
                  />
                </div>
              </div>
              <div className="row py-3">
                <div className='col-6'>
                  <p className='m-auto pb-2'>Localização</p>
                  <input
                    className="form-control form-control"
                    type="text"
                    value={localizacao}
                    onChange={(e) => setLocalizacao(e.target.value)}
                  />
                </div>
                <div className='col-6'>
                  <p className='m-auto pb-2'>Categoria</p>
                  <input
                    className="form-control form-control"
                    type="text"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  />
                </div>
                <div className='col-6'>
                  <p className='m-auto pb-2'>Quantidade</p>
                  <input
                    className="form-control form-control"
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantidade(e.target.value)}
                  />
                </div>
              </div>
              <div className="py-3 text-end">
                <Button
                  label="Atualizar"
                  onClick={handleAtualizar} // Usa o novo manipulador de eventos
                  className="btn btn-info"
                />
              </div>
            </Dialog>
          </div>
        </PanelBody>
      </Panel>
    </div >
  );
}

export default Produtos;
