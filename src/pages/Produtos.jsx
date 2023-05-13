import { Panel, PanelHeader, PanelBody } from "../components/panel/panel.jsx";
import React, { useState, useEffect } from "react";
import { api } from "../utils/api.js";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Tag } from 'primereact/tag';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

function Produtos() {
  const [tableData, setTableData] = useState([]);

  const tableColumns = [
    { field: 'nome', header: 'Nome' },
    { field: 'unid_medida', header: 'Unidade de medida' },
    { field: 'localizacao', header: 'Localização' },
    { field: 'categoria', header: 'Categoria' }
  ];

  async function onRowEditComplete(e) {
    let _products = [...tableData];
    let { newData, index } = e;

    _products[index] = newData;

    console.log(newData);

    console.log(newData.id);

    try {
      await api.put(`/admin/product/${newData.id}`, newData);

      const response = await api.get("/admin/product");
      let dados = response.data;

      console.log(dados);

      // const data = dados.map(dado => ({
      //   id: dado.id,
      //   nome: dado.name,
      //   unid_medida: dado.measure.unit_measure,
      //   localizacao: dado.location,
      //   quantity: dado.quantity,
      //   categoria: dado.category.name,
      // }));

      // setTableData(data);

    } catch (error) {
      console.log(error);
    }


  };

  const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  };

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
    }));



    setTableData(data);
    // console.log(data);

    // const get = { setTableData };
    // setTableData(data);
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div>
      <h1 className="page-header">Estoque de Produtos</h1>
      <Panel>
        <PanelHeader className="bg-teal-700 text-white" >Produtos</PanelHeader>
        <PanelBody>
          <div className="card">
            <form method="put">
              <DataTable
                paginator rows={5}
                rowsPerPageOptions={[5, 25, 50]}
                sortMode="multiple"
                value={tableData}
                editMode="row"
                dataKey="id"
                onRowEditComplete={onRowEditComplete}
                selectionMode="single"
                showGridlines
                stripedRows
                tableStyle={{ minWidth: '1rem', fontSize: '0.8rem' }}
              >
                {tableColumns.map(({ field, header }) => {
                  return <Column key={field} field={field} header={header} style={{ width: '25%' }} editor={(options) => textEditor(options)} onCellEditComplete={onRowEditComplete} />;
                })}
                <Column rowEditor onClick={onRowEditComplete()} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
              </DataTable>
            </form>
          </div>
        </PanelBody>
      </Panel>
    </div >
  );
}

export default Produtos;
