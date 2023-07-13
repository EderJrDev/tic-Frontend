import { api } from "../../utils/api";
import { addNotification } from "../../utils/notifications";
import updateTableData from "./updatedTable";

export async function createProduct(
  setCreateVisible,
  createName,
  category,
  createQuantity,
  unidadeMedida,
  createLocation,
  setTableData,
  purchase_allowed,
  originCityHall
) {

  try {
    const newData = {
      name: createName,
      category: category ? category : '',
      quantity: createQuantity,
      measure: unidadeMedida ? unidadeMedida : '',
      purchase_allowed: purchase_allowed,
      originCityHall: originCityHall,
      location: createLocation
    };

    await api.post(`/admin/product`, newData);

    await updateTableData(setTableData);
    setCreateVisible(false);
    addNotification(
      'success',
      'Produto Adicionado!',
      'Produto cadastrado com sucesso.',
      'top-right'
    );
  } catch (error) {
    addNotification(
      'danger',
      'Atualize todos os dados!',
      'Por favor, preencha todos os campos para realizar a atualização.',
      'top-right'
    );
    console.log(error);
  }
}