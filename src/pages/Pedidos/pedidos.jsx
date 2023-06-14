import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppSettings } from './../../config/app-settings.js';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { api } from "../../utils/api";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';



function CustomerOrder() {
  const [posMobileSidebarToggled, setPosMobileSidebarToggled] = useState(false);
  const context = useContext(AppSettings);

  const [cli, setCli] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedQuantityToAdd, setSelectedQuantityToAdd] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCardQuantity, setSelectedCardQuantity] = useState('');
  const [pedido, setPedido] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); // novo estado para armazenar o produto selecionado

  const handleCardClick = (item) => {
    setSelectedCardQuantity(item.quantity);
    setShowModal(true);
    setSelectedProduct(item); // armazena o produto selecionado no estado
  };

  const updateProduct = () => {
    const updatedOrders = [...orders];
    updatedOrders.push({
      product: selectedProduct.name,
      quantity: selectedQuantityToAdd
    });
    setOrders(updatedOrders);
  };
  


  useEffect(() => {
    async function getCategory() {
      const response = await api.get("/admin/product");
      const dados = response.data
      setCli(dados);
    }
    getCategory();
  }, []);

  return (
    <div className="vh-100">
      <div className={`pos pos-customer ${posMobileSidebarToggled ? 'pos-mobile-sidebar-toggled' : ''}`} id="pos-customer">
        <div className="pos-content">
          <PerfectScrollbar className="pos-content-container" options={{ suppressScrollX: true }}>
            <div className="product-row">
              <div className='col-lg-12'>
                <h1 className="page-header">Itens</h1>
              </div>
              {cli.map(item => (
                <div className='col-lg-4 pb-3' key={item.id}>
                  <div className="container" data-type="meat">
                    <Link className="product" data-bs-target="#" onClick={() => handleCardClick(item)}>
                      <div className="text">
                        <div className="title">{item.name}</div>
                        <div className="desc">Categoria: {item.location}</div>
                        <div className="price">Quantidade: {item.quantity}</div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <Dialog
              modal
              maximizable
              header="Editar Produtos"
              visible={showModal}
              onHide={() => setShowModal(false)}
              style={{ width: '75vw' }}
              contentStyle={{ height: '300px' }}
            >
              <div className="row mt-5 m-auto">
                <div className='col-lg-2'>
                  <p className='m-auto pb-2'>Quantidade em Estoque:</p>
                  <InputText
                    type="text"
                    className="p-inputtext-sm w-100"
                    value={selectedCardQuantity}
                  />
                </div>
                <div className='col-lg-2'>
                  <p className='m-auto pb-2'>Quantidade a Ser Adicionada:</p>
                  <InputText
                    type="text"
                    className="p-inputtext-sm w-100"
                    value={selectedQuantityToAdd}
                    onChange={(e) => setSelectedQuantityToAdd(e.target.value)}
                  />
                </div>
                <div className='col-lg-2'>
                  <div className='pt-4 mt-3'>
                    <button className="btn btn-info btn-btn-sm" onClick={updateProduct}>
                      <i className="bi bi-check-circle-fill"></i> Atualizar
                    </button>
                  </div>
                </div>
              </div>
            </Dialog>
          </PerfectScrollbar>
        </div>
        <div className="pos-sidebar" id="pos-sidebar">
          <div className="pos-sidebar-nav">
            <ul className="nav nav-tabs nav-fill">
              <li className="nav-item">
                <Link to="/pos/customer-order" className="nav-link active">Novo Pedido (5)</Link>
              </li>
            </ul>
          </div>
          <div className="pos-sidebar-body tab-content" data-scrollbar="true" data-height="100%">
            <div className="tab-pane fade h-100 show active" id="newOrderTab">
              <div className="pos-table">
                {orders.map((order, index) => (
                  <div className="row pos-table-row" key={index}>
                    <div className="col-9">
                      <div className="pos-product-thumb">
                        <div className="info">
                          <div className="title">{order.product}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 total-price">Qtd: {order.quantity}</div>
                  </div>
                ))}

              </div>
            </div>
          </div>
          <div className="pos-sidebar-footer">
            <div className="subtotal">
              <div className="text">Total em quantidade:</div>
              <div className="price">30</div>
            </div>
            <div className="total">
              <div className="text">Quantidade de Itens:</div>
              <div className="price">5</div>
            </div>
            <div className="btn-row">
              <Link to="/pos/customer-order" className="btn btn-success"><i className="fa fa-check fa-fw fa-lg"></i> Finalizar Pedido</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerOrder;
