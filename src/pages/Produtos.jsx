import React, { useState, useEffect } from "react";
import { ReactNotifications } from "react-notifications-component";

import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";

import { getMedida } from "./Products/getMedida.jsx";
import { getTable } from "./Products/getDataTable.jsx";
import { getCategory } from "./Products/getProducts.jsx";
import { createProduct } from "./Products/createProduct.jsx";
import { deleteProduct } from "./Products/deleteProduct.jsx";
import { updatedProduct } from "./Products/updatedProduct.jsx";
import { Panel, PanelBody, PanelHeader } from "../components/panel/panel.jsx";
import Loader from "../components/loader/loader.jsx";

function Products() {
  //Atributos do user
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [medida, setMedida] = useState([]);
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [tableData, setTableData] = useState([]);
  const [typeCategory, setTypeCategory] = useState([]);

  const [loading, setLoading] = useState(true);

  //Creates
  const [createName, setCreateName] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [createMeasure, setCreateMeasure] = useState(null);
  const [createCategory, setCreateCategory] = useState(null);

  const [unitMeasure, setUnitMeasure] = useState("");

  const [originCityHall, setOriginCityHall] = useState("");

  const [createLocation, setCreateLocation] = useState("");
  const [createQuantity, setCreateQuantity] = useState("");

  const tableColumns = [
    { field: "id", header: "ID" },
    { field: "name", header: "Nome" },
    { field: "category", header: "Categoria" },
    { field: "location", header: "Localização" },
    { field: "quantity", header: "Quantidade" },
    { field: "measure", header: "Unidade de medida" },
    { field: "purchase_allowed", header: "Compra Permitida" },
    { field: "originCityHall", header: "Fornecido pela Prefeitura" },
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

    setTimeout(() => setLoading(false), 900);
  }, []);

  const handleEditar = (rowData) => {
    setDialogVisible(true);
    setId(rowData.id);
    setName(rowData.name);
    setQuantity(rowData.quantity);
    setLocation(rowData.location);
    // console.log(rowData);

    const categoriaSelecionada = typeCategory.find(
      (categoria) => categoria.label === rowData.category
    );
    if (categoriaSelecionada) {
      setCategory(categoriaSelecionada.value); // Configura o rótulo da categoria
    }

    const unidadeSelecionada = medida.find(
      (medida) => medida.label === rowData.measure
    );
    if (unidadeSelecionada) {
      setUnitMeasure(unidadeSelecionada.value); // Configura o rótulo da categoria
    }

    const originCityHall = origin.find(
      (origin) => origin.label === rowData.originCityHall.props.children
    );
    if (originCityHall) {
      setOriginCityHall(originCityHall.value); // Configura o rótulo da categoria
    }
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
    getTable();
  }

  async function updated() {
    // updateTableData(tableData);
    updatedProduct(
      id,
      name,
      category,
      quantity,
      unitMeasure,
      location,
      setTableData,
      setDialogVisible,
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
      {loading ? (
        <Loader />
      ) : (
        <>
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
            <PanelHeader className="bg-teal-700 text-white">
              Produtos
            </PanelHeader>
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
                      className="btn btn-warning btn-btn-sm"
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
                  contentStyle={{ height: "200px" }}
                  footer={
                    <div>
                      <div className="col-lg-12 pt-3 mt-2">
                        <div className="text-center">
                          <Button
                            onClick={updated}
                            label="Atualizar"
                            className="btn-cyan"
                            icon="bi bi-check-circle-fill"
                          />
                        </div>
                      </div>
                    </div>
                  }
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
                          value={unitMeasure}
                          required
                          options={medida}
                          onChange={(e) => setUnitMeasure(e.value)}
                          placeholder={"Selecione Unidade de Medida"}
                          className="p-inputtext-sm w-100"
                        />
                      </div>
                    </div>

                    <div className="col-lg-4 mt-3">
                      <div className="d-flex flex-column m-1">
                        <label>Fornecido pela Prefeitura?</label>
                        <Dropdown
                          value={originCityHall}
                          required
                          options={origin}
                          onChange={(e) => setOriginCityHall(e.value)}
                          className="p-inputtext-sm w-100"
                          placeholder={"Fornecido pela Prefeitura?"}
                        />
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
                  contentStyle={{ height: "200px" }}
                  footer={
                    <div>
                      <div className="col-lg-12 pt-3 mt-2">
                        <div className="text-center">
                          <Button
                            onClick={sendProduct}
                            label="Cadastrar"
                            className="btn-cyan"
                            icon="bi bi-check-circle-fill"
                          />
                        </div>
                      </div>
                    </div>
                  }
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
                        <label>Fornecido pela Prefeitura?</label>
                        <Dropdown
                          value={originCityHall}
                          required
                          onChange={(e) => setOriginCityHall(e.value)}
                          options={origin}
                          placeholder={
                            "Selecione se ele é fornecido pela prefeitura"
                          }
                          className="p-inputtext-sm w-100"
                        />
                      </div>
                    </div>
                  </div>
                </Dialog>
              </form>
            </PanelBody>
          </Panel>
        </>
      )}
    </div>
  );
}

export default Products;
