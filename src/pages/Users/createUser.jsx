import { api } from "../../utils/api";
import { addNotification } from "../../utils/notifications";
import { getTable } from "./getDataTable";
import updateTableData from "./updatedTable";

export async function createUser(
  setCreateVisible,
  createName,
  createEmail,
  createPassword,
  createIsAdmin,
  setTableData
) {

  try {
    const newData = {
      name: createName,
      email: createEmail,
      password: createPassword,
      isAdmin: createIsAdmin,
    };
    // console.log(newData);

    await api.post(`/admin/user`, newData);

    await updateTableData(setTableData);
    setCreateVisible(false);
    getTable();

    addNotification(
      'success',
      'Usuário Adicionado!',
      'Usuário cadastrado com sucesso.',
      'top-right'
    );
  } catch (error) {
    addNotification(
      'danger',
      'Atualize todos os dados!',
      'Por favor, preencha todos os campos para criar um usuário.',
      'top-right'
    );
    console.log(error);
  }
}