import { api } from "../../utils/api";
import { addNotification } from "../../utils/notifications";
import updateTableData from "./updatedTable";

export async function updatedProduct(
  id,
  name,
  category,
  quantity,
  unitMeasure,
  location,
  setTableData,
  setDialogVisible,
  originCityHall
) {
  try {
    const updatedData = {
      name: name,
      categoryId: category,
      quantity: parseInt(quantity),
      measureId: unitMeasure,
      location: location,
      originCityHall: originCityHall,
    };

    console.log(updatedData);
    console.log(id);

    await api.put(`/admin/product/${id}`, updatedData);

    addNotification(
      "success",
      "Produto Editado!",
      "Produto editado com sucesso.",
      "top-right"
    );
    await updateTableData(setTableData);
    setDialogVisible(false);
  } catch (error) {
    addNotification(
      "danger",
      "Atualize todos os dados!",
      `${error.response.data.error}`,
      "top-right"
    );
    console.log(error);
  }
}
