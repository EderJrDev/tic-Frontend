import React, { useRef, useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { api } from "../../utils/api";
import { Toast } from "primereact/toast";

const OrderModal = ({
  showModalOrder,
  setShowModalOrder,
  tableData,
  handleCheck,
  // loading,
  columns,
  // disabled,
}) => {
  const inputRef = useRef(null); // Referência para o campo de entrada
  const toast = useRef(null);

  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Foca no campo de entrada quando uma linha é selecionada
    if (inputRef.current && selectedRow) {
      inputRef.current.focus();
    }
  }, [selectedRow]);

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        inputRef={inputRef} // Define a referência para o campo de entrada
        onChange={(e) => options.editorCallback(e.target.value)}
        onBlur={() => handleCellEditComplete(options)}
      />
    );
  };

  const handleCellEditComplete = async (options) => {
    setLoading(true);
    const { rowData, value } = options;

    console.log(rowData.id);
    console.log(value);

    const updated = await api.post(
      `/admin/order/updateProductCityHall/${rowData.id}`,
      {
        order_items: [
          {
            newQuantity: parseInt(value),
          },
        ],
      }
    );
    console.log(updated);
    setLoading(false);
    toast.current.show({
      severity: "success",
      summary: "Sucesso!",
      detail: "O Pedido foi atualizado com exito.",
      life: 3000,
    });
  };

  return (
    <Dialog
      header="Pedido Prefeitura"
      visible={showModalOrder}
      onHide={() => setShowModalOrder(false)}
      style={{ width: "75vw" }}
    >
      <div className="row">
        <Toast ref={toast} />
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
            selection={selectedRow}
            onSelectionChange={(e) => setSelectedRow(e.value)}
            emptyMessage="Nenhuma informação encontrada."
          >
            {columns.map((col) => (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                editor={(options) =>
                  col.field === "newQuantity" ? textEditor(options) : null
                }
                style={{ overflow: "visible" }} // Importante para evitar problemas de layout
              />
            ))}
            <Column
              header="Atualizar Status"
              body={(rowData) => (
                <div className="text-start">
                  {rowData.status.props.children === "Chegou" ? (
                    <p> O Pedido chegou!</p>
                  ) : (
                    <InputSwitch
                      checked={
                        rowData.status.props.children === "Chegou"
                          ? true
                          : false
                      }
                      // disabled={disabled}
                      onChange={(e) => handleCheck(e, rowData)}
                    />
                  )}
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
