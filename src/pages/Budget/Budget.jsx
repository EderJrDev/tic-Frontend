import { useEffect } from "react";
import ExportTable from "../../components/button/ExportTable";
import { Panel, PanelBody, PanelHeader } from "../../components/panel/panel";
import { LastOrders } from "./getBudget";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function Budget() {
  const [order, SetOrder] = useState();
  const [budget, Setbudget] = useState();
  const [category, SetCategory] = useState();
  const [products, Setproducts] = useState();
  const [tableData, setTableData] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const columns = [
    { field: "id", header: "ID" },
    { field: "produto", header: "Produto" },
  ];

  const exportColumns = columns.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  useEffect(() => {
    LastOrders(setTableData);
  }, []);
  return (
    <div>
      <h1 className="page-header">
        Painel Geral <small>Creche Nossa Senhora da Conceição</small>
      </h1>
      <div className="row">
        <div className="col-xl-12">
          <Panel>
            <PanelHeader className="bg-teal-700 text-white">
              Últimos Pedidos
            </PanelHeader>
            <PanelBody>
              <ExportTable
                tableData={tableData}
                exportColumns={exportColumns}
                globalFilterValue={globalFilterValue}
                onGlobalFilterChange={onGlobalFilterChange}
              />
              <DataTable
                stripedRows
                showGridlines
                value={tableData}
                paginator
                rows={5}
                sortMode="multiple"
                selectionMode="single"
                globalFilter={globalFilterValue}
                rowsPerPageOptions={[5, 25, 50]}
                tableStyle={{ minWidth: "1rem", fontSize: "0.8rem" }}
                emptyMessage="Nenhuma informação encontrada."
              >
                {columns.map((col, i) => (
                  <Column
                    sortable
                    key={col.field}
                    field={col.field}
                    header={col.header}
                    // filterMatchMode={FilterMatchMode.CONTAINS}
                  />
                ))}
              </DataTable>
            </PanelBody>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default Budget;
