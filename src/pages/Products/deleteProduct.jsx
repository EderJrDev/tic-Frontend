import { api } from "../../utils/api";
import { addNotification } from "../../utils/notifications";
import updateTableData from "./updatedTable";

export async function deleteProduct(e, rowData, setTableData) {
  e.preventDefault();
  const updatedData = {
    id: rowData.id,
  };

  try {
    await api.delete('/admin/product', { data: updatedData });
    
    await updateTableData(setTableData);
    addNotification(
      'success',
      'Produto Deletado!',
      'Produto deletado com sucesso.',
      'top-right'
    );
  } catch (error) {
    console.log(error);
  }
}