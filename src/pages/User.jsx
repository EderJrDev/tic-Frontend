import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { getTable } from "./Users/getDataTable.jsx";
import { createUser } from "./Users/createUser.jsx";
import { deleteUser } from "./Users/deleteUser.jsx";
import { updatedUser } from "./Users/updatedUser.jsx";
import { ReactNotifications } from "react-notifications-component";
import { Panel, PanelHeader, PanelBody } from "../components/panel/panel.jsx";
import Loader from "../components/loader/loader.jsx";
import updateTableData from "./Users/updatedTable.jsx";

function User() {
  //Atributos do user
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState([]);
  const [password, setPassword] = useState("");
  const [tableData, setTableData] = useState([]);

  const [loading, setLoading] = useState(true);

  //Creates
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createIsAdmin, setCreateIsAdmin] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);

  const tableColumns = [
    { field: "name", header: "Nome" },
    { field: "email", header: "Email" },
    { field: "isAdmin", header: "É administrador ?" },
  ];

  const adminOption = [
    { value: "true", label: "Sim" },
    { value: "false", label: "Não" },
  ];

  const [objEdit, setObjetEdit] = useState(null);

  const handleEditar = (e, rowData) => {
    setObjetEdit(rowData);
    setId(rowData.id);
    setName(rowData.name);
    setDialogVisible(true);
    setEmail(rowData.email);
    setIsAdmin(rowData.isAdmin);
    setPassword(rowData.password);
  };

  // console.log(objEdit);

  const handleCriarUser = () => {
    setCreateVisible(true);
  };

  async function sendUser() {
    createUser(
      setCreateVisible,
      createName,
      createEmail,
      createPassword,
      createIsAdmin,
      setTableData
    );
    setCreateName("");
    setCreateEmail("");
    setCreateIsAdmin([]);
    setCreatePassword("");
    getTable();
  }

  async function updateUser() {
    updateTableData(setTableData);
    updatedUser(
      id,
      name,
      email,
      password,
      isAdmin,
      setTableData,
      setDialogVisible
    );
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getTable();
      setTableData(data);
    }
    fetchData();

    setTimeout(() => setLoading(false), 900);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <div className="d-flex justify-content-between">
              <div>
                <h1 className="page-header">Lista de Usuários</h1>
              </div>
              <div>
                <button
                  className="btn btn-info btn-btn-sm"
                  onClick={(e) => handleCriarUser()}
                >
                  Adicionar <i className="bi bi-plus-circle"></i>
                </button>
              </div>
            </div>
            <ReactNotifications />
            <Panel>
              <PanelHeader className="bg-cyan-700 text-white">
                Usuários
              </PanelHeader>
              <PanelBody>
                <DataTable
                  rows={10}
                  paginator
                  stripedRows
                  showGridlines
                  value={tableData}
                  sortMode="multiple"
                  selectionMode="single"
                  rowsPerPageOptions={[10, 25, 50]}
                  emptyMessage="Nenhuma informação encontrada."
                  tableStyle={{ minWidth: "1rem", fontSize: "0.8rem" }}
                >
                  {tableColumns.map(({ field, header }) => {
                    return (
                      <Column
                        key={field}
                        field={field}
                        header={header}
                        style={{ width: "25%" }}
                      />
                    );
                  })}
                  <Column
                    header="Editar"
                    body={(rowData) => (
                      <button
                        className="btn btn-warning btn-btn-sm"
                        onClick={(e) => handleEditar(e, rowData)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    )}
                  />
                  {tableData.length > 1 && (
                    <Column
                      header="Deletar"
                      body={(rowData) => (
                        <button
                          className="btn btn-danger btn-btn-sm"
                          onClick={(e) => deleteUser(e, rowData, setTableData)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      )}
                    />
                  )}
                </DataTable>

                <form action="put">
                  <Dialog
                    modal
                    header="Editar Usuário"
                    visible={dialogVisible}
                    style={{ width: "35vw" }}
                    onHide={() => setDialogVisible(false)}
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <span>Nome</span>
                        <InputText
                          type="text"
                          value={name}
                          className="p-inputtext-sm w-100"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6">
                        <span>Email</span>
                        <InputText
                          type="text"
                          value={email}
                          className="p-inputtext-sm w-100"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6">
                        <span>Senha</span>
                        <InputText
                          type="password"
                          value={password}
                          className="p-inputtext-sm w-100"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6">
                        <span>É administrador?</span>
                        <Dropdown
                          required
                          value={isAdmin}
                          options={adminOption}
                          className="p-inputtext-sm w-100"
                          placeholder={"Selecione uma Opção"}
                          onChange={(e) => setIsAdmin(e.value)}
                        />
                      </div>
                      <div className="col-lg-12">
                        <div className="pt-4 mt-3 text-center">
                          <button
                            className="btn btn-info btn-btn-sm"
                            onClick={updateUser}
                          >
                            <i className="bi bi-check-circle-fill"></i>{" "}
                            Atualizar
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog>

                  <Dialog
                    modal
                    header="Adicionar um novo Usuário"
                    visible={createVisible}
                    onHide={() => setCreateVisible(false)}
                    style={{ width: "35vw" }}
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="d-flex flex-column m-1">
                          <label>Nome</label>
                          <InputText
                            type="text"
                            value={createName}
                            className="p-inputtext-sm"
                            placeholder="Nome do usuário"
                            onChange={(e) => setCreateName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="d-flex flex-column m-1">
                          <label>Email</label>
                          <InputText
                            type="email"
                            value={createEmail}
                            className="p-inputtext-sm"
                            placeholder="Email usuário"
                            onChange={(e) => setCreateEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="d-flex flex-column m-1">
                          <label>Senha</label>
                          <InputText
                            type="password"
                            value={createPassword}
                            className="p-inputtext-sm"
                            placeholder="*******"
                            onChange={(e) => setCreatePassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="d-flex flex-column m-1">
                          <label>Administrador?</label>
                          <Dropdown
                            required
                            value={createIsAdmin}
                            options={adminOption}
                            placeholder={"Selecione uma Opção"}
                            className="p-inputtext-sm w-100"
                            onChange={(e) => setCreateIsAdmin(e.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="text-center pt-5">
                          <button
                            className="btn btn-info btn-btn-sm"
                            onClick={sendUser}
                          >
                            <i className="bi bi-check-circle-fill"></i> Salvar
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog>
                </form>
              </PanelBody>
            </Panel>
          </div>
        </>
      )}
    </div>
  );
}

export default User;
