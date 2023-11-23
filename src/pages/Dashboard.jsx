import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";

import { Card } from "../components/card/card.jsx";
import { InfoCards } from "./Dashboard/InfoCards.jsx";
import { LastOrders } from "./Dashboard/LastOrders.jsx";

import ExportTable from "../components/button/ExportTable.jsx";
import { Panel, PanelHeader, PanelBody } from "../components/panel/panel.jsx";

function Dashboard() {
  const [order, SetOrder] = useState();
  const [budget, Setbudget] = useState();
  const [category, SetCategory] = useState();
  const [products, Setproducts] = useState();
  const [tableData, setTableData] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const columns = [
    { field: "produto", header: "Produto" },
    { field: "quantidade", header: "Quantidade" },
  ];

  const exportColumns = columns.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  useEffect(() => {
    LastOrders(setTableData, setPedidos);
    InfoCards(Setproducts, Setbudget, SetOrder, SetCategory);
  }, []);

  return (
    <div>
      <h1 className="page-header">
        Painel Geral <small>Creche Nossa Senhora da Conceição</small>
      </h1>
      <div className="row">
        <Card
          title="Produtos"
          content={products}
          footer="Cadastrados"
          style="widget widget-stats bg-teal"
          icon={<i className="fa fa-globe fa-fw"></i>}
        />
        <Card
          title="Orçamentos"
          content={budget}
          footer="Feitos"
          style="widget widget-stats bg-red"
          icon={<i className="fa fa-dollar-sign fa-fw"></i>}
        />
        <Card
          title="Pedidos"
          content={order}
          style={"widget widget-stats bg-indigo"}
          icon={<i className="fa fa-archive fa-fw"></i>}
        />
        <Card
          title="Categorias"
          content={category}
          style="widget widget-stats bg-green"
          icon={<i className="fa fa-comment-alt fa-fw"></i>}
        />
      </div>
      <div className="row">
        <div className="col-xl-12">
          <Panel>
            <PanelHeader className="bg-cyan-700 text-white">
              Produtos Acabando
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
                    filterMatchMode={FilterMatchMode.CONTAINS}
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

export default Dashboard;
