import { api } from "../../utils/api";
import error from "../../utils/errors";
import { addNotification } from "../../utils/notifications";

export async function LastOrders(setTableData) {
  try {
    const response = await api.get("/admin/order/latest");
    let dados = response.data;
    let getOrders = dados.orders;
    // console.log(response);

    const validit = (value) => {
      if (value === "pendente") {
        return <span className="badge bg-danger">Pendente</span>;
      } else {
        return <span className="badge bg-success">Concluído</span>;
      }
    };

    const data = getOrders.map((dado) => ({
      // id: dado.id
      status: validit(dado.status),
      produtos: dado.quant,
      data: new Date(dado.expected_date).toLocaleDateString("pt-BR"),
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
