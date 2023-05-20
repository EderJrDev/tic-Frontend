import { api } from "../utils/api.js";
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import React, { useState, useEffect } from "react";
import { Panel, PanelHeader, PanelBody } from "../components/panel/panel.jsx";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

function Produtos() {
  const [id, setId] = useState('');
  const [name, setNome] = useState('');
  const [medida, setMedida] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [category, setCategoria] = useState('');
  const [quantity, setQuantidade] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);

  const tableColumns = [
    { field: 'name', header: 'Nome' },
    { field: 'measure', header: 'Unidade de medida' },
    { field: 'localizacao', header: 'Localização' },
    { field: 'quantity', header: 'Quantidade' },
    { field: 'category', header: 'Categoria' }
  ];

  async function getClients() {
    const response = await api.get("/admin/product");
    let dados = response.data;

    const data = dados.map(dado => ({
      id: dado.id,
      name: dado.name,
      quantity: dado.quantity,
      localizacao: dado.location,
      category: dado.category.name,
      measure: dado.measure.unit_measure,
    }))
    setTableData(data);
  }

  async function getCategory() {
    const response = await api.get("/admin/category");
    const dados = response.data
    const data = dados.map(dado => ({
      value: dado.id, // valor do cliente
      label: dado.name,  // rótulo do cliente
    }));

    setClientes(data);
  }

  async function getMedida() {
    const response = await api.get("/admin/measure");
    const dados = response.data
    const data = dados.map(dado => ({
      value: dado.id,
      label: dado.unit_measure,
    }));
    setMedida(data);
  }

  const handleEditar = (event, rowData) => {
    setId(rowData.id)
    setNome(rowData.name);
    setCategoria(rowData.category);
    setQuantidade(rowData.quantity);
    setUnidadeMedida(rowData.measure);
    setLocalizacao(rowData.localizacao);
    setDialogVisible(true);
  };
  const handleAtualizar = async (e) => {
    e.preventDefault();

    const updatedData = {
      id: id,
      name: name,
      category: category,
      quantity: quantity,
      measure: unidadeMedida,
      localizacao: localizacao
    };

    const response = await api.put(`/admin/product`, updatedData);

    console.log(response);
    getClients();
    setDialogVisible(false); // Fecha a modal após a atualização
  };

  // const handleDeletar = async (e, rowData) => {
  //   e.preventDefault();
  //   const updatedData = {
  //     id: rowData.id,
  //   };

  //   const response = await api.delete(`/admin/product`, updatedData);

  //   console.log(response);
  //   getClients();  
  // };


  const handleDeletar = async (e, rowData) => {
    e.preventDefault();
    const updatedData = {
      id: rowData.id,
    };
  
    try {
      const response = await api.delete('/admin/product', { data: updatedData });
      console.log(response.data);
      getClients();
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    getClients();
    getMedida();
    getCategory();
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
                header="Editar"
                body={(rowData) => (
                  <Button
                    label="Editar"
                    onClick={(e) => handleEditar(e, rowData)}
                    className="btn btn-info"
                  />
                )}
              />
              <Column
                header="Deletar"
                body={(rowData) => (
                  <Button
                    label="Deletar"
                    onClick={(e) => handleDeletar(e, rowData)}
                    className="btn btn-danger"
                  />
                )}
              />
            </DataTable>
            <form action="put">
              <Dialog
                modal
                maximizable
                header="Editar Produtos"
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                style={{ width: '75vw' }}
                contentStyle={{ height: '300px' }}
              >
                <div className="row">
                  <div className='col-4'>
                    <p className='m-auto pb-2'>Nome</p>
                    <InputText
                      type="text"
                      className="p-inputtext-sm"
                      value={name}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                  <div className='col-4'>
                    <p className='m-auto pb-2'>Localização</p>
                    <InputText
                      type="text"
                      className="p-inputtext-sm"
                      value={localizacao}
                      onChange={(e) => setLocalizacao(e.target.value)}
                    />
                  </div>
                  <div className='col-4'>
                    <p className='m-auto pb-2'>Quantidade</p>
                    <InputText
                      type="number"
                      className="p-inputtext-sm"
                      value={quantity}
                      onChange={(e) => setQuantidade(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row py-3">
                  <div className='col-4'>
                    <p className='m-auto pb-2'>Categoria</p>
                    <Dropdown
                      value={category}
                      onChange={(e) => setCategoria(e.value)}
                      options={clientes}
                      filter
                      placeholder={'Selecione uma Categoria'}
                      className="p-inputtext-sm"
                    />
                  </div>
                  <div className='col-4'>
                    <p className='m-auto pb-2'>Unidade de medida</p>
                    <Dropdown
                      value={unidadeMedida}
                      onChange={(e) => setUnidadeMedida(e.value)}
                      options={medida}
                      filter
                      placeholder={'Selecione Unidade de Medida'}
                      className="p-inputtext-sm"
                    />
                  </div>
                  <div className='col-4'>
                    <p className='m-auto pb-3'><b>Confirmar</b></p>
                    <Button
                      label="Atualizar"
                      onClick={handleAtualizar}
                      className="btn btn-info"
                    />
                  </div>
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
