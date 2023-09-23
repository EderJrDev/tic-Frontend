import { api } from "../../utils/api";
import error from "../../utils/errors";
import { addNotification } from "../../utils/notifications";

export async function LastOrders(setTableData) {
  try {
    const response = await api.get("/admin/order/latest");
    let dados = response.data;
    console.log(response.data);

    const data = dados.map((dado) => ({
      id: dado.id,
      produto: dado.name,
    }));
    setTableData(data);
    // console.log(data);
    // atualizar o estado com os dados dos clientes
  } catch (e) {
    addNotification(
      "danger",
      "Falha na requisição!",
      `${error.errorApi} Status: ${e}`,
      "top-right"
    );
  }
}
