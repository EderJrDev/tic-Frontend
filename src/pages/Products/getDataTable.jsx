import { api } from "../../utils/api";
import { addNotification } from "../../utils/notifications";

export async function getTable() {
  try {
    const response = await api.get("/admin/product");
    let dados = response.data;
    console.log(dados);

    const validit = (value) => {
      if (value === true) {
        return <span className="badge bg-success">Sim</span>;
      } else {
        return <span className="badge bg-danger">Não</span>;
      }
    };

    const data = dados.map((dado) => ({
      id: dado.categoryId,
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
      "Por favor, varifique sua conexão com a internet.",
      "top-right"
    );
  }
}
