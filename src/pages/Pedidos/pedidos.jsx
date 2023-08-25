import React, { useState, useEffect } from 'react';
import { api } from "../../utils/api";
import { Link } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { addNotification } from '../../utils/notifications';
import { useRef } from 'react';

function CustomerOrder() {
  const [posMobileSidebarToggled, setPosMobileSidebarToggled] = useState(false);

  const [cli, setCli] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [quantityToAdd, setQuantityToAdd] = useState('');
  const [selectedCardQuantity, setSelectedCardQuantity] = useState('');
  // const [selectedProduct, setSelectedProduct] = useState(null); // novo estado para armazenar o produto selecionado
  const [pedidoQuantidade, setPedidoQuantidade] = useState(0);
  const [estoqueQuantidade, setEstoqueQuantidade] = useState(0);

  const [selectedProduct, setSelectedProduct] = useState({
    id: null,
    name: '',
    quantity: 0,
    quantityToAdd: 0,
  });

  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 });
  }

  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Message Content', life: 3000 });
  }

  const handleCardClick = (item) => {
    setSelectedCardQuantity(item.quantity);
    setShowModal(true);
    setSelectedProduct({ ...item, quantityToAdd: '' }); // Add the quantityToAdd property
  };

  const updateProduct = () => {
    console.log(selectedProduct);

    const updatedOrders = [...orders];
    updatedOrders.push({
      id: selectedProduct.id,
      product: selectedProduct.name,
      quantityInStock: selectedCardQuantity, // Use selectedCardQuantity instead of selectedQuantityToAdd
      newQuantity: quantityToAdd, // Use selectedCardQuantity instead of selectedQuantityToAdd
    });
    setOrders(updatedOrders);
    setShowModal(false);
    setSelectedProduct({ ...selectedProduct, quantityToAdd: '' }); // Reset the quantityToAdd property
    setQuantityToAdd('');
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

  const calcularTotais = () => {
    let totalPedidoQuantidade = 0;
    let totalEstoqueQuantidade = 0;

    console.log(orders);

    orders.forEach((order) => {
      totalPedidoQuantidade += order.quantity;
      // Adicione aqui qualquer lógica adicional para calcular o total de itens em estoque, se necessário

      // Exemplo de cálculo da quantidade em estoque:
      totalEstoqueQuantidade += quantityToAdd;
    });

    setPedidoQuantidade(totalPedidoQuantidade);
    setEstoqueQuantidade(totalEstoqueQuantidade);
  };

  useEffect(() => {
    calcularTotais();
  }, [orders]); // Recalcula os totais sempre que o array 'orders' for alterado

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(orders);

    // Prepare the data in the required JSON format
    const orderData = {
      status: 'pendente',
      expected_date: '07/21/2023',
      items: orders.map((order) => ({
        productId: order.id,
        quantityInStock: parseFloat(order.quantityInStock),
        newQuantity: parseFloat(order.newQuantity),
      })),
    };

    console.log(orderData);
    // Send the data to the backend API using the appropriate method (POST or PUT)
    // Here, I'll assume you are using POST method to create a new order
    api.post('/admin/order', orderData)
      .then((response) => {
        // addNotification(
        //   'info',
        //   'Pedido Realizado!',
        //   'Os dados foram consultados com sucesso.',
        //   'top-right'
        // );
        showSuccess();
        console.log('Order submitted successfully!', response.data);
        // Add any necessary logic to handle the successful submission
      })
      .catch((error) => {
        showError();
        console.error('Failed to submit order:', error);
        // Add any necessary error handling logic
      });
  };

  return (

    <div className="vh-100">
      <Toast ref={toast} />
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
                <div className="col-lg-6">
                  <p className="m-auto pb-2">Quantidade em Estoque:</p>
                  <InputText
                    type="number"
                    className="p-inputtext-sm w-100"
                    value={selectedProduct ? selectedProduct.quantity : ''}
                  />
                </div>
                <div className="col-lg-6">
                  <p className="m-auto pb-2">Quantidade a Ser Adicionada:</p>
                  <InputText
                    type="number"
                    placeholder='0'
                    value={quantityToAdd}
                    className="p-inputtext-sm w-100"
                    onChange={(e) =>
                      setQuantityToAdd(e.target.value)
                    }
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
                <div className='text-center'>
                  <p>Selecione um item para adicionar ao pedido.</p>
                </div>
                {orders.map((order, index) => (
                  <div className="row pos-table-row justify-content-between" key={index}>
                    <div className="col-2">
                      <div className="pos-product-thumb">
                        <div className="info">
                          <div className="title">{order.id}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="pos-product-thumb">
                        <div className="info">
                          <div className="title">{order.product}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-2 total-price d-none">{order.quantityInStock}</div>
                    <div className="col-6 total-price">Nova Quantidade: {order.newQuantity}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pos-sidebar-footer">
            {/* <div className="subtotal">
              <div className="text">Total em quantidade:</div>
              <div className="price">{pedidoQuantidade}</div>
            </div> */}
            <div className="subtotal">
              <div className="text">Quantidade de Itens:</div>
              <div className="price">{estoqueQuantidade}</div>
            </div>

            <div className="btn-row">
              <form onSubmit={handleSubmit}>
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
