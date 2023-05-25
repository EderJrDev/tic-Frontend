import { api } from "../../utils/api";

export async function getClients() {
  const response = await api.get('/admin/product');
  let dados = response.data;

  const data = dados.map((dado) => ({
    id: dado.id,
    name: dado.name,
    quantity: dado.quantity,
    location: dado.location,
    category: dado.category.name,
    measure: dado.measure.unit_measure,
  }));

  return data;
}