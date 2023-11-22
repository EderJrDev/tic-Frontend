import { api } from "../../utils/api";
import error from "../../utils/errors";
import { addNotification } from "../../utils/notifications";

export async function LastOrders(setTableData, setPedidos) {
  try {
    const response = await api.get("/admin/product/ending");
    let dados = response.data;
    console.log(response.data);

    const last = await api.get("/admin/order/show/pendentes");
    let lasts = last.data;
    console.log(lasts);
    
    const data = dados.map((dado) => ({
      produto: dado.name,
      quantidade: dado.quantity,
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
