import { api } from "../../utils/api";

export async function getTable() {
  const response = await api.get('/admin/product');
  let dados = response.data;
  // console.log(dados);

  const validit = (value) => {
    if (value === true) {
      return <span className="badge bg-success">Sim</span>
    } else {
      return <span className="badge bg-danger">Não</span>
    }
  }

  const data = dados.map((dado) => ({
    id: dado.id,
    name: dado.name,
    quantity: dado.quantity,
    location: dado.location,
    category: dado.category.name,
    measure: dado.measure.unit_measure,
    purchase_allowed: validit(dado.purchase_allowed),
    originCityHall: validit(dado.originCityHall)
  }));

  return data;
}