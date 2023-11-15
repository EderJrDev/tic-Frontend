import React from "react";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";

const OrderModal = ({
  showModalOrder,
  setShowModalOrder,
  tableData,
  handleCheck,
  loading,
  columns,
  disabled,
}) => {
  return (
    <Dialog
      header="Pedido"
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
