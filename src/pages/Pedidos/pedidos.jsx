import React, { useState, useEffect, useRef } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

import { api } from "../../utils/api";
import { Link } from "react-router-dom";

import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { InputSwitch } from "primereact/inputswitch";

function CustomerOrder() {
  // State
  const [cli, setCli] = useState([]);
  const [order, setOrder] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [orderName, setOrderName] = useState("");
  const [orderItems, setOrderItems] = useState({});

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [quantityToAdd, setQuantityToAdd] = useState("");
  const [expectedDate, setExpectedDate] = useState(null);
  const [showModalOrder, setShowModalOrder] = useState(false);
  const [selectedCardQuantity, setSelectedCardQuantity] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({
    id: null,
    name: "",
    quantity: 0,
    quantityToAdd: 0,
  });

  const columns = [
    { field: "id", header: "ID" },
    { field: "name", header: "Nome do Produto" },
    { field: "newQuantity", header: "Quantidade a ser Adicionada" },
    { field: "quantityInStock", header: "Quantidade em Estoque" },
    { field: "status", header: "Status do Pedido" },
  ];

  // Ref para as notificações
  const toast = useRef(null);

  // Funções para mostrar notificações
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Sucesso!",
      detail: "O Pedido foi criado com exito.",
      life: 3000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Falha!",
      detail: "Ocorreu um problema na busca das informações",
      life: 3000,
    });
  };

  // Manipulação de clique em um item
  const handleCardClick = (item) => {
    setSelectedCardQuantity(item.quantity);
    setShowModal(true);
    setSelectedProduct({ ...item, quantityToAdd: "" });
  };

  function handleCardOrder(orderId) {
    console.log("item ID: ", orderId);
    setSelectedItemId(orderId);
    const items = orderItems[orderId]; // Obtém os order items pelo ID do order
    setTableData(items); // Atualiza a tabela com os order items do order clicado
    setShowModalOrder(true); // Abre a modal
  }

  // Função para atualizar o produto
  const updateProduct = () => {
    const updatedOrders = [...orders];
    const newItem = {
      productId: selectedProduct.id,
      product: selectedProduct.name,
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
    getOrders();
  }, [order]);

  const validitStatus = (status) => {
    if (status === "pendente") {
      return <span className="badge bg-warning">Pendente</span>;
    } else {
      return <span className="badge bg-danger">Não</span>;
    }
  };

  async function getOrders() {
    try {
      const response = await api.get("/admin/order/show/orders");
      // console.log("get orders: ", response);
      const dados = response.data;
      setOrder(dados); // Armazena os orders

      const orderItemsMap = {};

      dados.forEach((order) => {
        const orderItems = order.order_items.map((orderItem) => ({
          id: orderItem.id,
          name: orderItem.product.name,
          newQuantity: orderItem.newQuantity,
          quantityInStock: orderItem.quantityInStock,
          status: validitStatus(orderItem.status),
        }));
        orderItemsMap[order.id] = orderItems;
      });

      setOrderItems(orderItemsMap);
      // Você pode definir a tabela com todos os order items aqui, se necessário
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  }

  // Efeito para enviar o pedido
  useEffect(() => {
    async function sendOrder() {
      const response = await api.get("/admin/product");
      const dados = response.data;
      setCli(dados);
    }
    sendOrder();
  }, []);

  const handleCheck = async (e, rowData) => {
    setSelectedRow(rowData);
    console.log("id: ", selectedItemId);
    try {
      const response = await api.post(
        `/admin/order/updateProduct/${selectedItemId}`,
        {
          status: "Chegou",
        }
      );

      console.log(response);

      showSuccess();
    } catch (error) {
      showError();
      console.error("Failed to submit order:", error);
    }
  };

  // async function handleCheck(e) {
  //   setChecked(e.value);

  //   try {
  //     const response = await api.post(
  //       `/admin/order/updadeProduct/${selectedItemId}`,
  //       {
  //         status: "Chegou",
  //       }
  //     );

  //     console.log(response);

  //     showSuccess();
  //   } catch (error) {
  //     showError();
  //     console.error("Failed to submit order:", error);
  //   }
  // }

  // Função para lidar com o envio do formulário
  async function handleSubmit(event) {
    event.preventDefault();

    const orderData = {
      name: orderName.toString(),
    };

    // Extrair os componentes da data (ano, mês, dia, hora, minuto, segundo)
    var ano = expectedDate.getFullYear();
    var mes = expectedDate.getMonth() + 1; // Note que os meses em JavaScript são baseados em zero (janeiro é 0)
    var dia = expectedDate.getDate();
    var hora = expectedDate.getHours();
    var minuto = expectedDate.getMinutes();
    var segundo = expectedDate.getSeconds();

    // Formatar a data no formato desejado pelo backend (ano-mês-diaThora:minuto:segundo.000Z)
    var dataFormatada = `${ano}-${mes.toString().padStart(2, "0")}-${dia
      .toString()
      .padStart(2, "0")}T${hora.toString().padStart(2, "0")}:${minuto
      .toString()
      .padStart(2, "0")}:${segundo.toString().padStart(2, "0")}.000Z`;

    try {
      const response = await api.post("/admin/order/createOrder", orderData);

      const orderItem = {
        order_items: [
          ...orders.map((item) => {
            const { product, ...rest } = item; //  removendo a propriedade 'product' pois o endpoint não precisa dela
            return {
              ...rest,
              status: "pendente",
              expected_date: dataFormatada,
              orderId: response.data.createdOrder.id,
              productId: item.productId,
            };
          }),
        ],
      };

      // console.log(orderItem);
      await api.post("/admin/order/createOrderItem", orderItem);

      showSuccess();
      setOrderName("");
      setExpectedDate("");
      setOrders([]);
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
                    </div>
                  </div>
                  <div className="tab-pane fade" id="default-tab-2">
                    <div className="invoice-header">
                      <div className="invoice-from">
                        <div className="d-flex row">
                          {order &&
                            order.map((item) => (
                              <>
                                <div key={item.id} className="col-lg-3 pb-3">
                                  <div className="container">
                                    <Link
                                      className="product bg-gray-100"
                                      data-bs-target="#"
                                      onClick={() => handleCardOrder(item.id)}
                                    >
                                      <div className="text">
                                        <div className="title">
                                          {item.name}{" "}
                                          <i class="fa-solid fa-arrow-right"></i>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                </div>
                                {/* modal to show orders */}
                                <Dialog
                                  modal
                                  header="Pedido"
                                  visible={showModalOrder}
                                  onHide={() => setShowModalOrder(false)}
                                  style={{ width: "75vw" }}
                                  // contentStyle={{ height: '300px' }}
                                >
                                  <div className="row">
                                    <div className="col-lg-12 pt-4">
                                      <div>
                                        <DataTable
                                          paginator
                                          scrollable
                                          stripedRows
                                          showGridlines
                                          rows={5}
                                          value={tableData}
                                          rowsPerPageOptions={[5, 25, 50]}
                                          tableStyle={{
                                            minWidth: "1rem",
                                            fontSize: "0.8rem",
                                          }}
                                          sortMode="multiple"
                                          scrollHeight="flex"
                                          selectionMode="single"
                                          emptyMessage="Nenhuma informação encontrada."
                                        >
                                          {columns.map((col) => (
                                            <Column
                                              sortable
                                              key={col.field}
                                              field={col.field}
                                              header={col.header}
                                            />
                                          ))}
                                          <Column
                                            header="Atualizar Status"
                                            body={(rowData) => (
                                              <div className="text-center">
                                                <InputSwitch
                                                  // checked={checked}
                                                  checked={
                                                    selectedRow === rowData
                                                  }
                                                  // onChange={(e) =>
                                                  //   handleCheck(e)
                                                  // }
                                                  onChange={(e) =>
                                                    handleCheck(e, rowData)
                                                  }
                                                />
                                              </div>
                                            )}
                                          />
                                        </DataTable>
                                      </div>
                                    </div>
                                  </div>
                                </Dialog>
                                {/* end modal to show orders */}
                              </>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* modal novo Pedido  */}
            <Dialog
              modal
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
            {/* end modal novo Pedido  */}
          </PerfectScrollbar>
        </div>
        <div className="pos-sidebar" id="pos-sidebar">
          <div className="pos-sidebar-nav">
            <ul className="nav nav-tabs nav-fill">
              <li className="nav-item">
                <h5 className="pt-3">Novo Pedido</h5>
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
                <div className="col-md-12">
                  <div className="pt-3">
                    <span className="p-float-label">
                      <InputText
                        id="pedido"
                        value={orderName}
                        className="w-100"
                        onChange={(e) => setOrderName(e.target.value)}
                      />
                      <label htmlFor="pedido">Nome do Pedido</label>
                    </span>
                  </div>
                </div>
                <div className="col-md-12 py-2">
                  <label htmlFor="orderName">Data Esperada</label>
                  <Calendar
                    showIcon
                    locale="pt"
                    className="w-100"
                    placeholder="dd/mm/aaaa"
                    value={expectedDate}
                    onChange={(e) => setExpectedDate(e.value)}
                  />
                </div>
                {orders.map((order, i) => (
                  <div
                    className="row pos-table-row justify-content-between"
                    key={i}
                  >
                    <div className="pos-sidebar-footer">
                      <div className="subtotal">
                        <div className="text">Em Estoque</div>
                        <div className="price">{order.quantityInStock}</div>
                      </div>
                      <div className="taxes">
                        <div className="text">Qtd á ser adicionada</div>
                        <div className="price">{order.newQuantity}</div>
                      </div>
                      <div className="total">
                        <div className="text">Produto</div>
                        <div className="price">{order.product}</div>
                      </div>
                    </div>
                    <div className="title d-none">{order.id}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pos-sidebar-footer">
            <div className="btn-row w-100">
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
