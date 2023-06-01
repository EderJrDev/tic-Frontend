import { api } from "../../utils/api";

export async function getTable() {
  const response = await api.get('/admin/user');
  let dados = response.data;

  const data = dados.map((dado) => ({
    id: dado.id,
    name: dado.name,
    email: dado.email,
    password: dado.password,
    isAdmin: dado.isAdmin,
  }));

  return data;
}