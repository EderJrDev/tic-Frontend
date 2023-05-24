import { api } from "../utils/api.js";
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { addNotification } from "../utils/notifications.js";
import React, { useState, useEffect } from "react";
import { ReactNotifications } from 'react-notifications-component';
import { Panel, PanelHeader, PanelBody } from "../components/panel/panel.jsx";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

function Produtos() {
  const [id, setId] = useState('');
  const [name, setNome] = useState('');
  const [medida, setMedida] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [category, setCategoria] = useState('');
  const [quantity, setQuantidade] = useState('');
  const [location, setLocalizacao] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [tableData, setTableData] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);


  const [createName, setCreateName] = useState('');

  const [createMeasure, setCreateMeasure] = useState([]);
  const [createCategory, setCreateCategory] = useState([]);

  const [createQuantity, setcreateQuantity] = useState('');
  const [createLocation, setCreateLocation] = useState('');

  const tableColumns = [
    { field: 'name', header: 'Nome' },
    { field: 'measure', header: 'Unidade de medida' },
    { field: 'location', header: 'Localização' },
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
      location: dado.location,
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
    setCreateCategory(data);
  }

  async function getMedida() {
    const response = await api.get("/admin/measure");
    const dados = response.data
    const data = dados.map(dado => ({
      value: dado.id,
      label: dado.unit_measure,
    }));
    setMedida(data);
    setCreateMeasure(data);
  }

  const handleCriar = async (e) => {
    e.preventDefault();

    try {
      const newData = {
        name: createName,
        category: createCategory,
        quantity: createQuantity,
        measure: createMeasure,
        location: createLocation
      };

      console.log(newData)

      const response = await api.post(`/admin/product`, newData);

      console.log(response);
      setCreateVisible(false); // Fecha a modal após a atualização
    } catch (error) {
      addNotification(
        'danger',
        'Atualize todos os dados!',
        'Por favor, preencha todos os campos para realizar a atualização.',
        'top-right'
      );
      console.log(error);
    }
  };


  const handleEditar = (event, rowData) => {
    setId(rowData.id)
    setNome(rowData.name);
    setCategoria(rowData.category);
    setQuantidade(rowData.quantity);
    setUnidadeMedida(rowData.measure);
    setLocalizacao(rowData.location);
    setDialogVisible(true);
  };

  const handleCriarProduct = () => {

    setCreateVisible(true);
  };


  const handleAtualizar = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        id: id,
        name: name,
        category: category,
        quantity: quantity,
        measure: unidadeMedida,
        location: location
      };

      const response = await api.put(`/admin/product`, updatedData);

      console.log(response);
      getClients();
      setDialogVisible(false); // Fecha a modal após a atualização
    } catch (error) {
      addNotification('danger', 'Atualize todos os dados!', 'Por favor preencha todos os campos para realizar a atualização.', 'top-right')
      console.log(error);
    }
  };

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
      <div className="d-flex justify-content-between">
        <div>
          <h1 className="page-header">Estoque de Produtos</h1>
        </div>
        <div>
          <Button
            label="Adicionar"
            onClick={(e) => handleCriarProduct()}
            className="btn btn-success"
          />
        </div>
      </div>
      <ReactNotifications
      />
      <Panel>
        <PanelHeader className="bg-teal-700 text-white">Produtos</PanelHeader>
        <PanelBody>
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
              totalRecords={tableData.length}
              tableStyle={{ minWidth: '1rem', fontSize: '0.8rem' }}
              editMode="row"
              dataKey="id"
              filter
            >
              {tableColumns.map(({ field, header }) => {
                return <Column
                  key={field}
                  field={field} header={header}
                  filterMatchMode={FilterMatchMode.CONTAINS}
                  style={{ width: '25%' }} />;
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
                      value={location}
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
                      required
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
                      filter
                      value={unidadeMedida}
                      required
                      onChange={(e) => setUnidadeMedida(e.value)}
                      options={medida}
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

              <Dialog
                modal
                maximizable
                header="Adicionar um novo produto"
                visible={createVisible}
                onHide={() => setCreateVisible(false)}
                style={{ width: '75vw' }}
                contentStyle={{ height: '300px' }}
              >
                <div className="row">
                  <div className='col-4'>
                    <p className='m-auto pb-2'>Nome</p>
                    <InputText
                      type="text"
                      className="p-inputtext-sm"
                      value={createName}
                      onChange={(e) => setCreateName(e.target.value)}
                    />
                  </div>
                  <div className='col-4'>
                    <p className='m-auto pb-2'>Localização</p>
                    <InputText
                      type="text"
                      className="p-inputtext-sm"
                      value={createLocation}
                      onChange={(e) => setCreateLocation(e.target.value)}
                    />
                  </div>
                  <div className='col-4'>
                    <p className='m-auto pb-2'>Quantidade</p>
                    <InputText
                      type="number"
                      className="p-inputtext-sm"
                      value={createQuantity}
                      onChange={(e) => setcreateQuantity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row py-3">
                  <div className='col-4'>
                    <p className='m-auto pb-2'>Categoria</p>
                    <Dropdown
                      value={category}
                      required
                      onChange={(e) => setCategoria(e.value)}
                      options={createCategory}
                      filter
                      placeholder={'Selecione uma Categoria'}
                      className="p-inputtext-sm"
                    />
                  </div>
                  <div className='col-4'>
                    <p className='m-auto pb-2'>Unidade de medida</p>
                    <Dropdown
                      filter
                      value={unidadeMedida}
                      required
                      onChange={(e) => setUnidadeMedida(e.value)}
                      options={createMeasure}
                      placeholder={'Selecione Unidade de Medida'}
                      className="p-inputtext-sm"
                    />
                  </div>
                  <div className='col-4'>
                    <p className='m-auto pb-3'><b>Confirmar</b></p>
                    <Button
                      label="Cadastrar"
                      onClick={handleCriar}
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
