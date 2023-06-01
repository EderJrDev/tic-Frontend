import React, { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { getTable } from "./Users/getDataTable.jsx";
import { createUser } from "./Users/createUser.jsx";
import { deleteUser } from "./Users/deleteUser.jsx";
import { updatedUser } from "./Users/updatedUser.jsx";
import { ReactNotifications } from 'react-notifications-component';
import { Panel, PanelHeader, PanelBody } from "../components/panel/panel.jsx";
import updateTableData from "./Users/updatedTable.jsx";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

function User() {

  //Atributos do user
  const [id, setId] = useState('');
  const [name, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState([]);
  const [tableData, setTableData] = useState([]);

  //Creates
  const [createName, setCreateName] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [createIsAdmin, setCreateIsAdmin] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);

  const tableColumns = [
    { field: 'name', header: 'Nome' },
    { field: 'email', header: 'Email' },
    { field: 'isAdmin', header: 'É administrador ?' },
  ];

  const adminOption = [
    { value: 'true', label: 'Sim' },
    { value: 'false', label: 'Não' },
  ];

  const handleEditar = (event, rowData) => {
    setId(rowData.id)
    setNome(rowData.name);
    setEmail(rowData.email);
    setPassword(rowData.password);
    setIsAdmin(rowData.isAdmin);
    setDialogVisible(true);
  };

  const handleCriarUser = () => {
    setCreateVisible(true);
  };

  async function sendUser() {
    createUser(setCreateVisible, createName, createEmail, createPassword, createIsAdmin, setTableData);
    setCreateName('');
    setCreateEmail('');
    setCreatePassword('');
    setCreateIsAdmin([]);
  }

  async function updateUser() {
    updateTableData(setTableData);
    updatedUser(id, name, email, password, isAdmin, setTableData, setDialogVisible);
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getTable();
      setTableData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>
          <h1 className="page-header">Lista de usuários</h1>
        </div>
        <div>
          <button className="btn btn-success btn-btn-sm" onClick={(e) => handleCriarUser()}>
            Adicionar <i className="bi bi-plus-circle"></i>
          </button>
        </div>
      </div>
      <ReactNotifications
      />
      <Panel>
        <PanelHeader className="bg-teal-700 text-white">Usuários</PanelHeader>
        <PanelBody>
          <div className="d-flex justify-content-end pb-3 flex-grow-1">
            <div className="p-input-icon-left mx-2 mt-1">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Pesquisar"
              />
            </div>
            <div>
              <button className="btn btn-info btn-btn-sm">
                <i className="bi bi-file-earmark-medical"></i>
              </button>
            </div>
          </div>
          <div className="card">
            <DataTable
              paginator
              stripedRows
              showGridlines
              sortMode="multiple"
              selectionMode="single"
              rows={10}
              rowsPerPageOptions={[10, 25, 50]}
              value={tableData}
              totalRecords={tableData.length}
              tableStyle={{ minWidth: '1rem', fontSize: '0.8rem' }}
              paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            >
              {tableColumns.map(({ field, header }) => {
                return <Column
                  key={field}
                  field={field} header={header}
                  style={{ width: '25%' }} />;
              })}
              <Column
                header="Editar"
                body={(rowData) => (
                  <button className="btn btn-info btn-btn-sm" onClick={(e) => handleEditar(e, rowData)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  // <Button
                  //   label="Editar"
                  //   onClick={(e) => handleEditar(e, rowData)}
                  //   className="btn btn-info"
                  // />
                )}
              />
              <Column
                header="Deletar"
                body={(rowData) => (
                  <button className="btn btn-danger btn-btn-sm" onClick={(e) => deleteUser(e, rowData, setTableData)}>
                    <i className="bi bi-trash"></i>
                  </button>
                  // <Button
                  //   label="Deletar"
                  //   onClick={(e) => deleteUser(e, rowData, setTableData)}
                  //   className="btn btn-danger"
                  // />
                )}
              />
            </DataTable>
            <form action="put">
              <Dialog
                modal
                maximizable
                header="Editar Usuários"
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                style={{ width: '75vw' }}
                contentStyle={{ height: '300px' }}
              >
                <div className="row mt-5 m-auto">
                  <div className='col-lg-2'>
                    <p className='m-auto pb-2'>Nome</p>
                    <InputText
                      type="text"
                      className="p-inputtext-sm w-100"
                      value={name}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <p className='m-auto pb-2'>Email</p>
                    <InputText
                      type="text"
                      className="p-inputtext-sm w-100"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <p className='m-auto pb-2'>Password</p>
                    <InputText
                      type="password"
                      className="p-inputtext-sm w-100"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <p className='m-auto pb-2'>É administrador ?</p>
                    <Dropdown
                      value={isAdmin}
                      required
                      onChange={(e) => setIsAdmin(e.value)}
                      options={adminOption}
                      placeholder={'Selecione uma opção'}
                      className="p-inputtext-sm w-100"
                    />
                  </div>
                  <div className='col-lg-2'>
                    <div className='pt-4 mt-3'>
                      <button className="btn btn-info btn-btn-sm" onClick={updateUser}>
                        <i className="bi bi-check-circle-fill"></i> Atualizar
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog>

              <Dialog
                modal
                maximizable
                header="Adicionar um novo produto"
                visible={createVisible}
                onHide={() => setCreateVisible(false)}
                style={{ width: '75vw' }}
                contentStyle={{ height: '300px' }}
              >
                <div className="row mt-5 m-auto">
                  <div className='col-lg-2'>
                    <p className='m-auto pb-2'>Nome</p>
                    <InputText
                      type="text"
                      className="p-inputtext-sm w-100"
                      value={createName}
                      onChange={(e) => setCreateName(e.target.value)}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <p className='m-auto pb-2'>Email</p>
                    <InputText
                      type="text"
                      className="p-inputtext-sm w-100"
                      value={createEmail}
                      onChange={(e) => setCreateEmail(e.target.value)}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <p className='m-auto pb-2'>Password</p>
                    <InputText
                      type="password"
                      className="p-inputtext-sm w-100"
                      value={createPassword}
                      onChange={(e) => setCreatePassword(e.target.value)}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <p className='m-auto pb-2'>é Adminitrador?</p>
                    <Dropdown
                      value={createIsAdmin}
                      required
                      onChange={(e) => setCreateIsAdmin(e.value)}
                      options={adminOption}
                      placeholder={'Selecione uma opção'}
                      className="p-inputtext-sm w-100"
                    />
                  </div>
                  <div className='col-lg-2'>
                    <div className='pt-4 mt-3'>
                      <button className="btn btn-info btn-btn-sm" onClick={sendUser}>
                        <i className="bi bi-check-circle-fill"></i> Criar
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog>
            </form>
          </div>
        </PanelBody>
      </Panel>
    </div >
  );
}

export default User;
