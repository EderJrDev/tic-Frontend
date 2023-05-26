import { api } from "../../utils/api";

export async function getCategory(setClientes, setCreateCategory) {
  const response = await api.get("/admin/category");
  const dados = response.data
  const data = dados.map(dado => ({
    value: dado.id, // valor do cliente
    label: dado.name,  // rótulo do cliente
  }));

  setClientes(data);
  setCreateCategory(data);
}