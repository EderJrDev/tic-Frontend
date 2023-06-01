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
  const [medida, setMedida] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [category, setCategoria] = useState('');
  const [tableData, setTableData] = useState([]);
  const [createName, setCreateName] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [createLocation, setCreateLocation] = useState('');
  const [createQuantity, setcreateQuantity] = useState('');
  const [createMeasure, setCreateMeasure] = useState(null);
  const [createVisible, setCreateVisible] = useState(false);
  const [createCategory, setCreateCategory] = useState(null);

  const tableColumns = [
    { field: 'name', header: 'Nome' },
    { field: 'category', header: 'Categoria' },
    { field: 'location', header: 'Localização' },
    { field: 'quantity', header: 'Quantidade' },
    { field: 'measure', header: 'Unidade de medida' }
  ];


  const handleCriarProduct = () => {
    setCreateVisible(true);
  };

  async function sendProduct() {
    updateTableData(setTableData);
    createProduct(setCreateVisible, createName, category, createQuantity, unidadeMedida, createLocation, setTableData);
    setCreateName('');
    setCategoria(null);
    setcreateQuantity('');
    setUnidadeMedida(null);
    setCreateLocation('');
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getTable();
      setTableData(data);
    };
    fetchData();

    getMedida(setMedida, setCreateMeasure);
    getCategory(setClientes, setCreateCategory);
  }, []);

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
              paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            >
              {tableColumns.map(({ field, header }) => {
                return <Column
                  key={field}
                  field={field} header={header}
                  style={{ width: '25%' }} />;
              })}
            </DataTable>
          </div>
        </PanelBody>
      </Panel>
    </div >
  );
}

export default Produtos;
