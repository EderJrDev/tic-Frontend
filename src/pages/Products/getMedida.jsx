import { api } from "../../utils/api";
import { addNotification } from "../../utils/notifications";

export async function getMedida(setMedida, setCreateMeasure) {
  try {
    const response = await api.get("/admin/measure");
    const dados = response.data;
    const data = dados.map((dado) => ({
      value: dado.id,
      label: dado.unit_measure,
    }));

    setMedida(data);
    setCreateMeasure(data);
  } catch (error) {
    addNotification(
      "danger",
      "Falha ao Deletar!",
      "Por favor, verifique sua conexão com a internet.",
      "top-right"
    );
  }
}
