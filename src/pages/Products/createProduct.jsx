import { api } from "../../utils/api";
import { addNotification } from "../../utils/notifications";
import updateTableData from "./updatedTable";

export async function createProduct(
  setCreateVisible,
  createName,
  category,
  createQuantity,
  unitMeasure,
  createLocation,
  setTableData,
  originCityHall
) {
  try {
    const newData = {
      name: createName,
      categoryId: category ? category : "",
      quantity: JSON.parse(createQuantity),
      measureId: unitMeasure ? unitMeasure : "",
      originCityHall: originCityHall,
      location: createLocation,
    };

    // console.log(newData);

    await api.post(`/admin/product`, newData);

    await updateTableData(setTableData);
    setCreateVisible(false);

    addNotification(
      "success",
      "Produto Adicionado!",
      "Produto cadastrado com sucesso.",
      "top-right"
    );
  } catch (error) {
    addNotification(
      "danger",
      "Atualize todos os dados!",
      "Por favor, preencha todos os campos para realizar a atualização.",
      "top-right"
    );
    console.log(error);
  }
}
