import { api } from "../../utils/api";
import { addNotification } from "../../utils/notifications";
import updateTableData from "./updatedTable";

export async function updatedUser(id, name, email, password, isAdmin, setTableData, setDialogVisible) {
  try {

    const updatedData = {
      id: id,
      name: name ? name : '',
      email: email ? email : '',
      password: password,
      isAdmin: JSON.parse(isAdmin),
    };

    console.log(updatedData);

    await api.put(`/admin/user/${id}`, updatedData);

    addNotification(
      'success',
      'Usuário Editado!',
      'Usuário editado com sucesso.',
      'top-right'
    );
    await updateTableData(setTableData);
    setDialogVisible(false);
  } catch (error) {
    addNotification(
      'danger',
      'Atualize todos os dados!',
      'Por favor preencha todos os campos para realizar a atualização.',
      'top-right'
    )
    console.log(error);
  }
}