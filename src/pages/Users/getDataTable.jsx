import { api } from "../../utils/api";
import { addNotification } from "../../utils/notifications";

export async function getTable() {
  try {
    const response = await api.get("/admin/user");
    let dados = response.data;

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
      email: dado.email,
      password: dado.password,
      isAdmin: validit(dado.isAdmin),
    }));

    return data;
  } catch (error) {
    addNotification(
      "danger",
      "Falha ao Deletar!",
      "Por favor, verifique sua conexão com a internet.",
      "top-right"
    );
  }
}
