import { api } from "../../utils/api";

export async function getMedida(setMedida, setCreateMeasure) {
  const response = await api.get("/admin/measure");
  const dados = response.data
  const data = dados.map(dado => ({
    value: dado.id,
    label: dado.unit_measure,
  }));

  setMedida(data);
  setCreateMeasure(data);
}