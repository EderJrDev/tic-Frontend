import React, { useState } from "react";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from "primereact/dialog";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

function EditarProdutoModal({ handleAtualizar, clientes, medida }) {
  const [name, setNome] = useState('');
  const [category, setCategoria] = useState('');
  const [quantity, setQuantidade] = useState('');
  const [location, setLocalizacao] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleConfirmar = (e) => {
    e.preventDefault();
    handleAtualizar(e);
    setDialogVisible(false);
  };

  return (
    <form action="put">
      <Dialog
        modal
        maximizable
        header="Editar Produtos"
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        style={{ width: '75vw' }}
        contentStyle={{ height: '300px' }}
      >
        <div className="row">
          <div className='col-4'>
            <p className='m-auto pb-2'>Nome</p>
            <InputText
              type="text"
              className="p-inputtext-sm"
              value={name}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className='col-4'>
            <p className='m-auto pb-2'>Localização</p>
            <InputText
              type="text"
              className="p-inputtext-sm"
              value={location}
              onChange={(e) => setLocalizacao(e.target.value)}
            />
          </div>
          <div className='col-4'>
            <p className='m-auto pb-2'>Quantidade</p>
            <InputText
              type="number"
              className="p-inputtext-sm"
              value={quantity}
              onChange={(e) => setQuantidade(e.target.value)}
            />
          </div>
        </div>
        <div className="row py-3">
          <div className='col-4'>
            <p className='m-auto pb-2'>Categoria</p>
            <Dropdown
              value={category}
              required
              onChange={(e) => setCategoria(e.value)}
              options={clientes}
              filter
              placeholder={'Selecione uma Categoria'}
              className="p-inputtext-sm"
            />
          </div>
          <div className='col-4'>
            <p className='m-auto pb-2'>Unidade de medida</p>
            <Dropdown
              value={unidadeMedida}
              required
              onChange={(e) => setUnidadeMedida(e.value)}
              options={medida}
              filter
              placeholder={'Selecione Unidade de Medida'}
              className="p-inputtext-sm"
            />
          </div>
          <div className='col-4'>
            <p className='m-auto pb-3'><b>Confirmar</b></p>
            <Button
              label="Atualizar"
              onClick={handleConfirmar}
              className="btn btn-info"
            />
          </div>
        </div>
      </Dialog>
    </form>
  );
}

export default EditarProdutoModal;