import React from "react";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";

const OrderModal = ({
  showModalOrder,
  setShowModalOrder,
  tableData,
  setTableData,
  handleCheck,
  loading,
  columns,
  disabled,
}) => {
  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const onCellEditComplete = (e) => {
    let { rowData, newValue, value, field, originalEvent } = e;

    if (field === "newQuantity") {
      if (!originalEvent) {
        // Check if the cell editing was canceled
        rowData["newQuantity"] = "pref" + rowData["newQuantity"]; // your expression
      }
    }
  };
  return (
    <Dialog
      header="Pedido Prefeitura"
      visible={showModalOrder}
      onHide={() => setShowModalOrder(false)}
      style={{ width: "75vw" }}
    >
      <div className="row">
        <div className="col-lg-12 pt-4">
          <DataTable
            paginator
            scrollable
            stripedRows
            showGridliness
            rows={5}
            loading={loading}
            value={tableData}
            rowsPerPageOptions={[5, 25, 50]}
            tableStyle={{
              minWidth: "1rem",
              fontSize: "0.8rem",
            }}
            sortMode="multiple"
            scrollHeight="flex"
            selectionMode="single"
            emptyMessage="Nenhuma informação encontrada."
          >
            {columns.map((col) => (
              <Column
                sortable
                key={col.field}
                field={col.field}
                header={col.header}
                editor={(options) =>
                  col.field === "newQuantity" ? textEditor(options) : null
                }
                onCellEditComplete={onCellEditComplete}
                onCellEditCancel={onCellEditComplete} // Handle cancel action
              />
            ))}
            <Column
              header="Atualizar Status"
              body={(rowData) => (
                <div className="text-center">
                  <InputSwitch
                    checked={
                      rowData.status.props.children === "Chegou" ? true : false
                    }
                    disabled={disabled}
                    onChange={(e) => handleCheck(e, rowData)}
                  />
                </div>
              )}
            />
          </DataTable>
        </div>
      </div>
    </Dialog>
  );
};

export default OrderModal;
