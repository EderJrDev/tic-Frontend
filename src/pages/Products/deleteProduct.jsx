import { api } from "../../utils/api";
import { addNotification } from "../../utils/notifications";
import updateTableData from "./updatedTable";

export async function deleteProduct(e, rowData, setTableData) {
  console.log(rowData)
  e.preventDefault();
  const updatedData = 4;
  try {
    await api.delete(`/admin/product/4`);

    await updateTableData(setTableData);
    addNotification(
      "success",
      "Produto Deletado!",
      "Produto deletado com sucesso.",
      "top-right"
    );
  } catch (error) {
    addNotification(
      "danger",
      "Falha ao Deletar!",
      `${error.response.data.error}`,
      "top-right"
    );
    console.log(error);
  }
}
