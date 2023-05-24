import React from "react";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { useState } from "react";

function CriarProdutoModal({ createProduct, clientes, medida }) {

  const [name, setNome] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantidade] = useState('');
  const [location, setLocalizacao] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');

  return (
    <Dialog
      modal
      maximizable
      header="Editar Produtos"
      // visible={dialogVisible}
      // onHide={() => setDialogVisible(false)}
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
          <InputText
            type="number"
            className="p-inputtext-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className='col-4'>
          <p className='m-auto pb-2'>Unidade de Medida</p>
          <InputText
            type="number"
            className="p-inputtext-sm"
            value={unidadeMedida}
            onChange={(e) => setUnidadeMedida(e.target.value)}
          />
        </div>
        <div className='col-4'>
          <p className='m-auto pb-3'><b>Confirmar</b></p>
          <Button
            label="Atualizar"
            onClick={createProduct}
            className="btn btn-info"
          />
        </div>
      </div>
    </Dialog>
  );
}

export default CriarProdutoModal;