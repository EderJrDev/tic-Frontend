import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { format } from "date-fns";
import { api } from "../../utils/api";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

function CustomerOrder() {
  // State
  const [cli, setCli] = useState([]);
  const [order, setOrder] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [quantityToAdd, setQuantityToAdd] = useState("");
  const [pedidoQuantidade, setPedidoQuantidade] = useState(0);
  const [estoqueQuantidade, setEstoqueQuantidade] = useState(0);
  const [selectedCardQuantity, setSelectedCardQuantity] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({
    id: null,
    name: "",
    quantity: 0,
    quantityToAdd: 0,
  });

  // Ref para as notificações
  const toast = useRef(null);

  // Funções para mostrar notificações
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Message Content",
      life: 3000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Message Content",
      life: 3000,
    });
  };

  // Manipulação de clique em um item
  const handleCardClick = (item) => {
    setSelectedCardQuantity(item.quantity);
    setShowModal(true);
    setSelectedProduct({ ...item, quantityToAdd: "" });
  };

  // Função para atualizar o produto
  const updateProduct = () => {
    const updatedOrders = [...orders];
    const newItem = {
      productId: selectedProduct.id,
      // product: selectedProduct.name,
      quantityInStock: selectedCardQuantity,
      newQuantity: parseFloat(quantityToAdd),
    };
    updatedOrders.push(newItem);
    setOrders(updatedOrders);
    setShowModal(false);
    setQuantityToAdd("");
    setSelectedProduct({ ...selectedProduct, quantityToAdd: "" });
  };

  // Efeito para buscar a lista de produtos
  useEffect(() => {
    async function getCategory() {
      const response = await api.get("/admin/product");
      const dados = response.data;
      setCli(dados);
    }
    getCategory();
  }, []);

  // Efeito para buscar a lista de pedidos
  useEffect(() => {
    async function getOrder() {
      const response = await api.get("/admin/order");
      const dados = response.data;
      setOrder(dados);
    }
    getOrder();
  }, []);

  // Efeito para enviar o pedido
  useEffect(() => {
    async function sendOrder() {
      const response = await api.get("/admin/product");
      const dados = response.data;
      setCli(dados);
    }
    sendOrder();
  }, []);

  // Função para lidar com o envio do formulário
  async function handleSubmit(event) {
    event.preventDefault();

    // const date = new Date();
    // const today = format(date, "yyyy-MM-dd");

    const orderData = {
      name: "ORDER TESTE",
    };

    try {
      const response = await api.post("/admin/order/createOrder", orderData);

      console.log(orders);

      // const orderItem = {
      //   order_items: [
      //     orders.map((item) => ({
      //       ...item,
      //       status: "pendente",
      //       expected_date: "2023-08-09T14:30:00.000Z",
      //       orderId: response.data.createdOrder.id,
      //       productId: item.id,
      //     })),
      //   ],
      // };

      // const orderItem = {
      //   order_items: orders.map((item) => ({
      //     ...item,
      //     status: "pendente",
      //     expected_date: "2023-08-09T14:30:00.000Z",
      //     orderId: response.data.createdOrder.id,
      //     productId: item.id,
      //   })),
      // };

      const orderItem = {
        order_items: [
          ...orders.map((item) => ({
            ...item,
            status: "pendente",
            expected_date: "2023-08-09T14:30:00.000Z",
            orderId: response.data.createdOrder.id,
            productId: item.productId, // Use productId para referenciar o produto
          })),
        ],
      };

      console.log(orderItem);

      const responseOrder = await api.post(
        "/admin/order/createOrderItem",
        orderItem
      );

      console.log(responseOrder);
      showSuccess();
    } catch (error) {
      showError();
      console.error("Failed to submit order:", error);
    }
  }

  return (
    <div className="vh-100">
      <Toast ref={toast} />
      <div
        className={`pos pos-customer ${"pos-mobile-sidebar-toggled"}`}
        id="pos-customer"
      >
        <div className="pos-content">
          <PerfectScrollbar
            className="pos-content-container"
            options={{ suppressScrollX: true }}
          >
            <div className="product-row">
              <div className="col-lg-12">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a
                      href="#default-tab-1"
                      data-bs-toggle="tab"
                      className="nav-link active"
                    >
                      <span className="d-sm-none">Itens</span>
                      <span className="d-sm-block d-none">Itens</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#default-tab-2"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      <span className="d-sm-none">Pedidos</span>
                      <span className="d-sm-block d-none">Pedidos</span>
                    </a>
                  </li>
                </ul>

                <div className="tab-content panel rounded-0 p-3 m-0">
                  <div className="tab-pane fade active show" id="default-tab-1">
                    <div className="invoice-header">
                      <div className="invoice-from">
                        <div className="d-flex row">
                          {cli.map((item) => (
                            <div className="col-lg-4 pb-3" key={item.id}>
                              <div className="container" data-type="meat">
                                <Link
                                  className="product bg-gray-100"
                                  data-bs-target="#"
                                  onClick={() => handleCardClick(item)}
                                >
                                  <div className="text">
                                    <div className="title">{item.name}</div>
                                    <div className="desc">
                                      Categoria: {item.location}
                                    </div>
                                    <div className="price">
                                      Quantidade: {item.quantity}
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="tab-pane fade" id="default-tab-2">
                    <h1 className="page-header">order</h1>
                  </div>
                </div>
              </div>
            </div>

            <Dialog
              modal
              maximizable
              header="Novo Pedido"
              visible={showModal}
              onHide={() => setShowModal(false)}
              style={{ width: "50vw" }}
              // contentStyle={{ height: '300px' }}
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
                    <button
                      className="btn btn-info btn-btn-sm"
                      onClick={updateProduct}
                    >
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
                <Link to="/pos/customer-order" className="nav-link active">
                  Novo Pedido
                </Link>
              </li>
            </ul>
          </div>
          <div
            className="pos-sidebar-body tab-content"
            data-scrollbar="true"
            data-height="100%"
          >
            <div className="tab-pane fade h-100 show active" id="newOrderTab">
              <div className="pos-table">
                <div className="text-center">
                  <p>Selecione um item para adicionar ao pedido.</p>
                </div>
                {orders.map((order, index) => (
                  <div
                    className="row pos-table-row justify-content-between"
                    key={index}
                  >
                    <div className="title d-none">{order.id}</div>
                    <div className="row pos-table-row" key={index}>
                      <div className="pos-product-thumb">
                        <div className="info">
                          <div className="title">Produto: {order.product}</div>
                        </div>
                      </div>
                      <div className="pos-product-thumb">
                        <div className="d-none">{order.id}</div>
                      </div>
                      <div className="pos-product-thumb py-1">
                        <div className="info">
                          <div className="title pb-1">
                            Quantidade em Estoque:
                            <span className="font-weight-bold text-danger">
                              {order.quantityInStock}
                            </span>
                          </div>
                          <div className="title">
                            Nova Quantidade:{" "}
                            <span className="font-weight-bold text-success">
                              {order.newQuantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pos-sidebar-footer">
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
    </div>
  );
}

export default CustomerOrder;
