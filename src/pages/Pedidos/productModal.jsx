import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const ProductModal = ({
  quantity,
  setQuantity,
  showModal,
  setShowModal,
  quantityToAdd,
  setQuantityToAdd,
  updateProduct,
  updateProductQuantity,
  origin,
}) => {
  return (
    <Dialog
      modal
      header="Novo Pedido Prefeitura"
      visible={showModal}
      onHide={() => setShowModal(false)}
      style={{ width: "35vw" }}
    >
      <div className="row">
        <div className={`${!origin ? "col-lg-12 pb-3" : "col-lg-12"}`}>
          <p className="m-auto pb-2">Qual a quantidade atual em estoque?</p>
          <InputText
            type="number"
            className="p-inputtext-sm w-100"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        {!origin && (
          <div className={`${!origin ? "col-lg-12" : "col-lg-12"}`}>
            <p className="m-auto pb-2">Quantidade a Ser Adicionada:</p>
            <InputText
              type="number"
              placeholder="0"
              value={quantityToAdd}
              className="p-inputtext-sm w-100"
              onChange={(e) => setQuantityToAdd(e.target.value)}
            />
          </div>
        )}
        <div className="col-lg-12 pt-4">
          <div className="text-center">
            {!origin ? (
              <button
                className="btn btn-info btn-btn-sm"
                onClick={updateProduct}
              >
                <i className="bi bi-check-circle-fill"></i> Atualizar
              </button>
            ) : (
              <button
                className="btn btn-info btn-btn-sm"
                onClick={updateProductQuantity}
              >
                <i className="bi bi-check-circle-fill"></i> Atualizar
              </button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductModal;
