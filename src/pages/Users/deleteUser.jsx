import { api } from "../../utils/api";
import { addNotification } from "../../utils/notifications";
import updateTableData from "./updatedTable";

export async function deleteUser(e, rowData, setTableData) {
  e.preventDefault();
  const updatedData = rowData.id;

  try {
    await api.delete(`/admin/user/${updatedData}`,);

    await updateTableData(setTableData);
    addNotification(
      'success',
      'User Deletado!',
      'User deletado com sucesso.',
      'top-right'
    );
  } catch (error) {
    addNotification(
      'danger',
      'Falha ao Deletar!',
      'Por favor, varifique sua conexão com a internet.',
      'top-right'
    );
    console.log(error);
  }
}