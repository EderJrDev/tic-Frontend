import React, { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { getMedida } from "./Products/getMedida.jsx";
import { getTable } from "./Products/getDataTable.jsx";
import { getCategory } from "./Products/getProducts.jsx";
import { createProduct } from "./Products/createProduct.jsx";
import { deleteProduct } from "./Products/deleteProduct.jsx";
import { updatedProduct } from "./Products/updatedProduct.jsx";
import { ReactNotifications } from 'react-notifications-component';
import { Panel, PanelHeader, PanelBody } from "../components/panel/panel.jsx";
import updateTableData from "./Products/updatedTable.jsx";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Produtos() {
  const [id, setId] = useState('');
  const [name, setNome] = useState('');
  const [medida, setMedida] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [category, setCategoria] = useState('');
  const [tableData, setTableData] = useState([]);
  const [quantity, setQuantidade] = useState('');
  const [location, setLocalizacao] = useState('');
  const [createName, setCreateName] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [createLocation, setCreateLocation] = useState('');
  const [createQuantity, setcreateQuantity] = useState('');
  const [createMeasure, setCreateMeasure] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [createCategory, setCreateCategory] = useState(null);

  const [purchase_allowed, setPurchase_allowed] = useState(null);
  const [originCityHall, setOriginCityHall] = useState(null);

  const tableColumns = [
    { field: 'name', header: 'Nome' },
    { field: 'category', header: 'Categoria' },
    { field: 'location', header: 'Localização' },
    { field: 'quantity', header: 'Quantidade' },
    { field: 'measure', header: 'Unidade de medida' },
    { field: 'purchase_allowed', header: 'Compra Aprovada' },
    { field: 'originCityHall', header: 'Vem da Prefeitura' }
  ];

  const handleEditar = (event, rowData) => {
    setId(rowData.id)
    setNome(rowData.name);
    setCategoria(rowData.category);
    setQuantidade(rowData.quantity);
    setUnidadeMedida(rowData.measure);
    setLocalizacao(rowData.location);
    setOriginCityHall(rowData);
    setPurchase_allowed(rowData);
    setDialogVisible(true);
  };

  const handleCriarProduct = () => {
    setCreateVisible(true);
  };

  async function sendProduct() {
    updateTableData(setTableData);
    createProduct(setCreateVisible, createName, category, createQuantity, unidadeMedida, createLocation, setTableData, purchase_allowed, originCityHall);
    setCreateName('');
    setCategoria(null);
    setcreateQuantity('');
    setUnidadeMedida(null);
    setCreateLocation('');
  };

  async function updateProduct() {
    updateTableData(setTableData);
    updatedProduct(id, name, category, quantity, unidadeMedida, location, setTableData, setDialogVisible, purchase_allowed, originCityHall);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getTable();
      setTableData(data);
    };
    fetchData();

    getMedida(setMedida, setCreateMeasure);
    getCategory(setClientes, setCreateCategory);
  }, []);

  const purchase = [
    { value: true, label: 'Sim' },
    { value: false, label: 'Não' },
  ];

  const origin = [
    { value: true, label: 'Sim' },
    { value: false, label: 'Não' },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>
          <h1 className="page-header">Estoque de Produtos</h1>
        </div>
        <div>
          <button className="btn btn-success btn-btn-sm" onClick={(e) => handleCriarProduct()}>
            Adicionar <i className="bi bi-plus-circle"></i>
          </button>
        </div>
      </div>
      <ReactNotifications
      />
      <Panel>
        <PanelHeader className="bg-teal-700 text-white">Produtos</PanelHeader>
        <PanelBody>
          <div className="d-flex justify-content-end pb-3 flex-grow-1">
            <div className="p-input-icon-left mx-2 mt-1">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Pesquisar"
              />
            </div>
            <div>
              <button className="btn btn-info btn-btn-sm">
                <i className="bi bi-file-earmark-medical"></i>
              </button>
            </div>
          </div>
          <div className="card">
            <DataTable
              paginator
              stripedRows
              showGridlines
              sortMode="multiple"
              selectionMode="single"
              rows={10}
              rowsPerPageOptions={[10, 25, 50]}
              value={tableData}
              totalRecords={tableData.length}
              tableStyle={{ minWidth: '1rem', fontSize: '0.8rem' }}
              emptyMessage="Nenhuma informação encontrada."
            >
              {tableColumns.map(({ field, header }) => {
                return <Column
                  key={field}
                  field={field} header={header}
                  style={{ width: '25%' }} />;
              })}
              <Column
                header="Editar"
                body={(rowData) => (
                  <button className="btn btn-info btn-btn-sm" onClick={(e) => handleEditar(e, rowData)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  // <Button
                  //   label="Editar"
                  //   onClick={(e) => handleEditar(e, rowData)}
                  //   className="btn btn-info"
                  // />
                )}
              />
              <Column
                header="Deletar"
                body={(rowData) => (
                  <button className="btn btn-danger btn-btn-sm" onClick={(e) => deleteProduct(e, rowData, setTableData)}>
                    <i className="bi bi-trash"></i>
                  </button>
                  // <Button
                  //   label="Deletar"
                  //   onClick={(e) => deleteProduct(e, rowData, setTableData)}
                  //   className="btn btn-danger"
                  // />
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
                style={{ width: '70vw' }}
                contentStyle={{ height: '360px' }}
              >
                <div className="row">
                  <div className="col-lg-4">
                    <div className="d-flex flex-column m-1">
                      <label>Nome</label>
                      <InputText
                        type="text"
                        value={name}
                        className="p-inputtext-sm"
                        placeholder="Nome do produto"
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="d-flex flex-column m-1">
                      <label>Localização</label>
                      <InputText
                        type="text"
                        value={location}
                        className="p-inputtext-sm"
                        placeholder="Nome do produto"
                        onChange={(e) => setLocalizacao(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="d-flex flex-column m-1">
                      <label>Quantidade</label>
                      <InputText
                        type="text"
                        value={quantity}
                        className="p-inputtext-sm"
                        placeholder="Nome do produto"
                        onChange={(e) => setQuantidade(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 mt-3">
                    <div className="d-flex flex-column m-1">
                      <label>Categoria</label>
                      <Dropdown
                        value={category}
                        required
                        onChange={(e) => setCategoria(e.value)}
                        options={clientes}
                        placeholder={'Selecione uma Categoria'}
                        className="p-inputtext-sm w-100"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 mt-3">
                    <div className="d-flex flex-column m-1">
                      <label>Unidade de medida</label>
                      <Dropdown
                        value={unidadeMedida}
                        required
                        onChange={(e) => setUnidadeMedida(e.value)}
                        options={medida}
                        placeholder={'Selecione Unidade de Medida'}
                        className="p-inputtext-sm w-100"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 mt-3">
                    <div className="d-flex flex-column m-1">
                      <label>Compra aprovada</label>
                      <Dropdown
                        value={purchase_allowed}
                        required
                        onChange={(e) => setPurchase_allowed(e.value)}
                        options={purchase}
                        placeholder={'Selecione Unidade de Medida'}
                        className="p-inputtext-sm w-100"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 mt-3">
                    <div className="d-flex flex-column m-1">
                      <label>Vem da Prefeitura</label>
                      <Dropdown
                        value={originCityHall}
                        required
                        onChange={(e) => setOriginCityHall(e.value)}
                        options={origin}
                        placeholder={'Selecione Unidade de Medida'}
                        className="p-inputtext-sm w-100"
                      />
                    </div>
                  </div>

                  <div className='col-lg-12 pt-3 mt-3'>
                    <div className='text-center'>
                      <button
                        className="btn btn-info btn-btn-sm"
                        onClick={updateProduct}>
                        Atualizar <i className="bi bi-check-circle-fill"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog>

              <Dialog
                modal
                maximizable
                header="Adicionar um novo produto"
                visible={createVisible}
                onHide={() => setCreateVisible(false)}
                style={{ width: '70vw' }}
                contentStyle={{ height: '350px' }}
              >
                <div className="row">
                  <div className="col-lg-4">
                    <div className="d-flex flex-column m-1">
                      <label>Nome</label>
                      <InputText
                        type="text"
                        value={createName}
                        className="p-inputtext-sm"
                        placeholder="Nome do produto"
                        onChange={(e) => setCreateName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="d-flex flex-column m-1">
                      <label>Localização</label>
                      <InputText
                        type="text"
                        value={createLocation}
                        className="p-inputtext-sm"
                        placeholder="Exemplo: Cozinha"
                        onChange={(e) => setCreateLocation(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="d-flex flex-column m-1">
                      <label>Quantidade</label>
                      <InputText
                        type="number"
                        value={createQuantity}
                        className="p-inputtext-sm"
                        placeholder="0"
                        onChange={(e) => setcreateQuantity(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="d-flex flex-column m-1">
                      <label>Categoria</label>
                      <Dropdown
                        value={category}
                        required
                        onChange={(e) => setCategoria(e.value)}
                        options={createCategory}
                        placeholder={'Selecione uma Categoria'}
                        className="p-inputtext-sm w-100"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="d-flex flex-column m-1">
                      <label>Unidade de medida</label>
                      <Dropdown
                        value={unidadeMedida}
                        required
                        onChange={(e) => setUnidadeMedida(e.value)}
                        options={createMeasure}
                        placeholder={'Selecione Unidade de Medida'}
                        className="p-inputtext-sm w-100"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="d-flex flex-column m-1">
                      <label>Compra aprovada</label>
                      <Dropdown
                        value={purchase_allowed}
                        required
                        onChange={(e) => setPurchase_allowed(e.value)}
                        options={purchase}
                        placeholder={'Selecione Unidade de Medida'}
                        className="p-inputtext-sm w-100"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="d-flex flex-column m-1">
                      <label>Vem da Prefeitura</label>
                      <Dropdown
                        value={originCityHall}
                        required
                        onChange={(e) => setOriginCityHall(e.value)}
                        options={origin}
                        placeholder={'Selecione Unidade de Medida'}
                        className="p-inputtext-sm w-100"
                      />
                    </div>
                  </div>
                  <div className='col-lg-12 pt-3 mt-2'>
                    <div className='text-center'>
                      <button
                        onClick={sendProduct}
                        className="btn btn-info btn-btn-sm"
                      >
                        Cadastrar <i className="bi bi-check-circle-fill"></i>

                      </button>
                    </div>
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
