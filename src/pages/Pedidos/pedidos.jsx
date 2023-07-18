import React, { useState, useEffect, useContext } from 'react';
import { api } from "../../utils/api";
import { Link } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { AppSettings } from './../../config/app-settings.js';

import PerfectScrollbar from 'react-perfect-scrollbar';

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
    setShowModal(false);
    setSelectedQuantityToAdd(0);
  };

  useEffect(() => {
    async function getCategory() {
      const response = await api.get("/admin/product");
      const dados = response.data
      setCli(dados);
    }
    getCategory();
  }, []);

  useEffect(() => {
    async function sendOrder() {

      const response = await api.get("/admin/product");
      const dados = response.data
      setCli(dados);
    }
    sendOrder();
  }, []);

  const [pedidoQuantidade, setPedidoQuantidade] = useState(0);
  const [estoqueQuantidade, setEstoqueQuantidade] = useState(0);

  const calcularTotais = () => {
    let totalPedidoQuantidade = 0;
    let totalEstoqueQuantidade = 0;

    orders.forEach((order) => {
      totalPedidoQuantidade += parseFloat(order.quantity);
      // Adicione aqui qualquer lógica adicional para calcular o total de itens em estoque, se necessário
    });

    setPedidoQuantidade(totalPedidoQuantidade);
    setEstoqueQuantidade(totalEstoqueQuantidade);
  };

  useEffect(() => {
    calcularTotais();
  }, [orders]); // Recalcula os totais sempre que o array 'orders' for alterado

  const handleSubmit = (event) => {

    event.preventDefault();
    console.log('Quantidade do Pedido:', pedidoQuantidade);
    console.log('Quantidade em Estoque:', estoqueQuantidade);
  };

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
              header="Novo Pedido"
              visible={showModal}
              onHide={() => setShowModal(false)}
              style={{ width: '50vw' }}
            // contentStyle={{ height: '300px' }}
            >
              <div className="row">
                <div className='col-lg-6'>
                  <p className='m-auto pb-2'>Quantidade em Estoque:</p>
                  <InputText
                    type="number"
                    className="p-inputtext-sm w-100"
                    value={selectedCardQuantity}
                  />
                </div>
                <div className='col-lg-6'>
                  <p className='m-auto pb-2'>Quantidade a Ser Adicionada:</p>
                  <InputText
                    type="number"
                    value={selectedQuantityToAdd}
                    className="p-inputtext-sm w-100"
                    onChange={(e) => setSelectedQuantityToAdd(e.target.value)}
                  />
                </div>
                <div className='col-lg-12 pt-4'>
                  <div className='text-center'>
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
                <Link to="/pos/customer-order" className="nav-link active">Novo Pedido</Link>
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
              <div className="price">{pedidoQuantidade}</div>
            </div>
            <div className="subtotal">
              <div className="text">Quantidade de Itens:</div>
              <div className="price">{estoqueQuantidade}</div>
            </div>

            <div className="btn-row">
              {/* <Link
                to="/pos/customer-order"
                className="btn btn-success">
                <i className="fa fa-check fa-fw fa-lg">
                </i> Finalizar Pedido
              </Link> */}
              <form  onSubmit={handleSubmit}>
                <button type="submit" className="btn btn-success">
                  <i className="fa fa-check fa-fw fa-lg"></i> Finalizar Pedido
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerOrder;
