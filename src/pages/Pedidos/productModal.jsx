import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const ProductModal = ({showModal, setShowModal, quantityToAdd, setQuantityToAdd, selectedProduct, updateProduct}) => {
  return (
    <Dialog
      modal
      header="Novo Pedido"
      visible={showModal}
      onHide={() => setShowModal(false)}
      style={{ width: "35vw" }}
    >
      <div className="row">
        <div className="col-lg-6">
          <p className="m-auto pb-2">Quantidade em Estoque:</p>
          <InputText
            type="number"
            className="p-inputtext-sm w-100"
            value={selectedProduct ? selectedProduct.quantity : ""}
          />
        </div>
        <div className="col-lg-6">
          <p className="m-auto pb-2">Quantidade a Ser Adicionada:</p>
          <InputText
            type="number"
            placeholder="0"
            value={quantityToAdd}
            className="p-inputtext-sm w-100"
            onChange={(e) => setQuantityToAdd(e.target.value)}
          />
        </div>
        <div className="col-lg-12 pt-4">
          <div className="text-center">
            <button className="btn btn-info btn-btn-sm" onClick={updateProduct}>
              <i className="bi bi-check-circle-fill"></i> Atualizar
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductModal;
