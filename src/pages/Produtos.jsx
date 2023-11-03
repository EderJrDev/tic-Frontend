import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";

import { ReactNotifications } from "react-notifications-component";
import { Panel, PanelBody, PanelHeader } from "../components/panel/panel.jsx";
import { createProduct } from "./Products/createProduct.jsx";
// import { deleteProduct } from "./Products/deleteProduct.jsx";
import { getTable } from "./Products/getDataTable.jsx";
import { getMedida } from "./Products/getMedida.jsx";
import { getCategory } from "./Products/getProducts.jsx";
import updateTableData from "./Products/updatedTable.jsx";
import { updatedProduct } from "./Products/updatedProduct.jsx";
import { deleteProduct } from "./Products/deleteProduct.jsx";

function Products() {
  //Atributos do user
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [medida, setMedida] = useState([]);
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [typeCategory, setTypeCategory] = useState([]);
  const [tableData, setTableData] = useState([]);

  //Creates
  const [createName, setCreateName] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [createMeasure, setCreateMeasure] = useState(null);
  const [createCategory, setCreateCategory] = useState(null);
  const [unitMeasure, setUnitMeasure] = useState("");

  const [originCityHall, setOriginCityHall] = useState(null);
  const [purchase_allowed, setPurchase_allowed] = useState(null);

  const [createLocation, setCreateLocation] = useState("");
  const [createQuantity, setCreateQuantity] = useState("");

  const tableColumns = [
    { field: "id", header: "ID" },
    { field: "name", header: "Nome" },
    { field: "category", header: "Categoria" },
    { field: "location", header: "Localização" },
    { field: "quantity", header: "Quantidade" },
    { field: "measure", header: "Unidade de medida" },
    { field: "purchase_allowed", header: "Compra Aprovada" },
    { field: "originCityHall", header: "Vem da Prefeitura" },
  ];

  const purchase = [
    { value: true, label: "Sim" },
    { value: false, label: "Não" },
  ];

  const origin = [
    { value: true, label: "Sim" },
    { value: false, label: "Não" },
  ];

  useEffect(() => {
    async function fetchData() {
      const data = await getTable();
      setTableData(data);
    }
    fetchData();

    getMedida(setMedida, setCreateMeasure);
    getCategory(setTypeCategory, setCreateCategory);
  }, []);

  const handleEditar = (rowData) => {
    setDialogVisible(true);
    console.log(rowData);
    setId(rowData.id);
    setName(rowData.name);
    setCategory(rowData.category);
    setQuantity(rowData.quantity);
    setUnitMeasure(rowData.measure);
    setLocation(rowData.location);
    setPurchase_allowed(rowData.purchase_allowed);
    setOriginCityHall(rowData.originCityHall);
  };

  const handleCreateProduct = () => {
    setCreateVisible(true);
  };

  async function sendProduct() {
    createProduct(
      setCreateVisible,
      createName,
      category,
      createQuantity,
      unitMeasure,
      createLocation,
      setTableData,
      purchase_allowed,
      originCityHall
    );
    setName("");
    setQuantity("");
    setCreateName("");
    setCreateLocation("");
    setCreateQuantity("");
    setCategory(null);
    setUnitMeasure(null);
    setOriginCityHall(null);
    setPurchase_allowed(null);
    getTable();
  }

  async function updated() {
    updateTableData(tableData);
    updatedProduct(
      id,
      name,
      category,
      quantity,
      unitMeasure,
      location,
      setTableData,
      setDialogVisible,
      purchase_allowed,
      originCityHall
    );
    setName("");
    setCategory(null);
    setQuantity("");
    setUnitMeasure(null);
    setLocation("");
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>
          <h1 className="page-header">Estoque de Produtos</h1>
        </div>
        <div>
          <button
            className="btn btn-info btn-btn-sm"
            onClick={(e) => handleCreateProduct()}
          >
            Adicionar <i className="bi bi-plus-circle"></i>
          </button>
        </div>
      </div>
      <ReactNotifications />
      <Panel>
        <PanelHeader className="bg-cyan-700 text-white">Usuários</PanelHeader>
        <PanelBody>
          <DataTable
            rows={10}
            paginator
            stripedRows
            showGridlines
            value={tableData}
            sortMode="multiple"
            selectionMode="single"
            rowsPerPageOptions={[10, 25, 50]}
            emptyMessage="Nenhuma informação encontrada."
            tableStyle={{ minWidth: "1rem", fontSize: "0.8rem" }}
          >
            {tableColumns.map(({ field, header }) => {
              return (
                <Column
                  key={field}
                  field={field}
                  header={header}
                  style={{ width: "25%" }}
                />
              );
            })}
            <Column
              header="Editar"
              body={(rowData) => (
                <button
                  className="btn btn-info btn-btn-sm"
                  onClick={() => handleEditar(rowData)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
              )}
            />
            <Column
              header="Deletar"
              body={(rowData) => (
                <button
                  className="btn btn-danger btn-btn-sm"
                  onClick={(e) => deleteProduct(e, rowData, setTableData)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              )}
            />
          </DataTable>

          <form action="put">
            <Dialog
              modal
              header="Editar Produtos"
              visible={dialogVisible}
              onHide={() => setDialogVisible(false)}
              style={{ width: "70vw" }}
              contentStyle={{ height: "360px" }}
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
                      onChange={(e) => setName(e.target.value)}
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
                      placeholder="Localização do produto"
                      onChange={(e) => setLocation(e.target.value)}
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
                      placeholder="Quantidade do produto"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-lg-4 mt-3">
                  <div className="d-flex flex-column m-1">
                    <label>Categoria</label>
                    <Dropdown
                      value={category}
                      required
                      onChange={(e) => setCategory(e.value)}
                      options={typeCategory}
                      placeholder={"Selecione uma Categoria"}
                      className="p-inputtext-sm w-100"
                    />
                  </div>
                </div>

                <div className="col-lg-4 mt-3">
                  <div className="d-flex flex-column m-1">
                    <label>Unidade de medida</label>
                    <Dropdown
                      required
                      options={medida}
                      value={unitMeasure}
                      onChange={(e) => setUnitMeasure(e.value)}
                      className="p-inputtext-sm w-100"
                      placeholder={"Selecione Unidade de Medida"}
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
                      placeholder={"Compra Aprovada?"}
                      className="p-inputtext-sm w-100"
                    />
                  </div>
                </div>

                <div className="col-lg-4 mt-3">
                  <div className="d-flex flex-column m-1">
                    <label>Vem da Prefeitura</label>
                    <Dropdown
                      required
                      options={origin}
                      value={originCityHall}
                      className="p-inputtext-sm w-100"
                      placeholder={"Produto vem da Prefeitura?"}
                      onChange={(e) => setOriginCityHall(e.value)}
                    />
                  </div>
                </div>

                <div className="col-lg-12 pt-3 mt-3">
                  <div className="text-center">
                    <button
                      className="btn btn-info btn-btn-sm"
                      onClick={updated}
                    >
                      Atualizar <i className="bi bi-check-circle-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            </Dialog>

            <Dialog
              modal
              header="Adicionar um novo produto"
              visible={createVisible}
              onHide={() => setCreateVisible(false)}
              style={{ width: "70vw" }}
              contentStyle={{ height: "350px" }}
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
                      placeholder="0"
                      className="p-inputtext-sm"
                      onChange={(e) => setCreateQuantity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="d-flex flex-column m-1">
                    <label>Categoria</label>
                    <Dropdown
                      value={category}
                      required
                      onChange={(e) => setCategory(e.value)}
                      options={createCategory}
                      placeholder={"Selecione uma Categoria"}
                      className="p-inputtext-sm w-100"
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="d-flex flex-column m-1">
                    <label>Unidade de medida</label>
                    <Dropdown
                      required
                      value={unitMeasure}
                      options={createMeasure}
                      onChange={(e) => setUnitMeasure(e.value)}
                      className="p-inputtext-sm w-100"
                      placeholder={"Selecione Unidade de Medida"}
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="d-flex flex-column m-1">
                    <label>Compra aprovada</label>
                    <Dropdown
                      value={purchase_allowed}
                      required
                      options={purchase}
                      onChange={(e) => setPurchase_allowed(e.value)}
                      className="p-inputtext-sm w-100"
                      placeholder={"Selecione se a Compra foi aprovada"}
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
                      placeholder={"Selecione a Unidade de Medida"}
                      className="p-inputtext-sm w-100"
                    />
                  </div>
                </div>
                <div className="col-lg-12 pt-3 mt-2">
                  <div className="text-center">
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
        </PanelBody>
      </Panel>
    </div>
  );
}

export default Products;
