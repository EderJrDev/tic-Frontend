import { api } from "../../utils/api";
import { addNotification } from "../../utils/notifications";

export async function getCategory(setClientes, setCreateCategory) {
  try {
    const response = await api.get("/admin/category");
    const dados = response.data
    const data = dados.map(dado => ({
      value: dado.id, // valor do cliente
      label: dado.name,  // rótulo do cliente
    }));

    setClientes(data);
    setCreateCategory(data);

  } catch (e) {
    addNotification(
      'danger',
      'Falha ao Deletar!',
      'Por favor, varifique sua conexão com a internet.',
      'top-right'
    );
  }
}