import { api } from "../../utils/api";
import { addNotification } from "../../utils/notifications";
import updateTableData from "./updatedTable";

export async function updatedProduct(id, name, category, quantity, unidadeMedida, location, setTableData, setDialogVisible) {
  try {
    const updatedData = {
      id: id,
      name: name,
      category: category,
      quantity: quantity,
      measure: unidadeMedida,
      location: location
    };

     await api.put(`/admin/product`, updatedData);

    addNotification(
      'success',
      'Produto Editado!',
      'Produto editado com sucesso.',
      'top-right'
    );
    await updateTableData(setTableData);
    setDialogVisible(false);
  } catch (error) {
    addNotification(
      'danger',
      'Atualize todos os dados!',
      'Por favor preencha todos os campos para realizar a atualização.',
      'top-right'
    )
    console.log(error);
  }
}