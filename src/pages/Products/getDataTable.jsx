import { api } from "../../utils/api";
import { addNotification } from "../../utils/notifications";

export async function getTable() {
  try {
    const response = await api.get("/admin/product");
    let dados = response.data;
    // console.log(dados);

    const validit = (value) => {
      if (value === true) {
        return (
          <span className="badge bg-green">
            <i className="bi bi-check-lg"></i>
          </span>
        );
      } else {
        return (
          <span className="badge bg-secondary">
            <i className="bi bi-x-lg"></i>
          </span>
        );
      }
    };

    const data = dados.map((dado) => ({
      id: dado.id,
      name: dado.name,
      quantity: dado.quantity,
      location: dado.location,
      category: dado.category.name,
      measure: dado.unit_measure.unit_measure,
      purchase_allowed: validit(dado.purchase_allowed),
      originCityHall: validit(dado.originCityHall),
    }));

    return data;
  } catch (error) {
    addNotification(
      "danger",
      "Falha na busca das informações!",
      "Por favor, verifique sua conexão com a internet.",
      "top-right"
    );
  }
}
