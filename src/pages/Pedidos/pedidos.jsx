import React, { useState, useEffect, useRef } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

import { api } from "../../utils/api";
import { Link } from "react-router-dom";

import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";

import OrderModal from "./orderModal";
import ProductModal from "./productModal";
import Loader from "../../components/loader/loader";
import { formatDate } from "../../utils/formatDate";
import OrderAuthModal from "./orderAuthModal";

function CustomerOrder() {
  // State
  const [cli, setCli] = useState([]);
  const [productsCityHall, setProductsCityHall] = useState([]);
  const [order, setOrder] = useState([]);
  const [orderAuth, setOrderAuth] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableDataAuth, setTableDataAuth] = useState([]);
  const [orderName, setOrderName] = useState("");
  const [orderItems, setOrderItems] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [origin, setOrigin] = useState(null);

  const [loadingPage, setLoadingPage] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState("default-tab-1");

  const [quantity, setQuantity] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [quantityToAdd, setQuantityToAdd] = useState("");
  const [expectedDate, setExpectedDate] = useState(null);
  const [showModalOrder, setShowModalOrder] = useState(false);
  const [showModalOrderAuth, setShowModalOrderAuth] = useState(false);
  const [loading, setLoading] = useState(false);
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
    { field: "quantityInStock", header: "Quantidade em Estoque" },
    { field: "newQuantity", header: "Quantidade Recebida" },
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
    setQuantity(item.quantity);
    setOrigin(item.originCityHall);
    setShowModal(true);
    setSelectedProduct({ ...item, quantityToAdd: "" });
  };

  async function handleCardOrder(orderId) {
    getOrders();
    getCategory();
    // console.log("item ID: ", orderId);
    let foundObjectsArray = [];
    // Verifica se o orderId existe como uma chave no objeto
    if (orderId in orderItems) {
      // Obtém o array correspondente ao orderId
      let foundArray = orderItems[orderId];
      // Agora você pode acessar os objetos dentro do array encontrado
      foundArray.forEach((obj) => {
        // console.log("Objeto encontrado:", obj);
        foundObjectsArray.push(obj);
      });
    } else {
      console.log("Nenhum array encontrado para o orderId:", orderId);
    }

    setTableData(foundObjectsArray); // Atualiza a tabela com os order items do order clicado
    setShowModalOrder(true); // Abre a modal
  }

  async function handleCardOrderAuth(orderId) {
    getOrders();
    getCategory();
    // console.log("item ID: ", orderId);
    let foundObjectsArray = [];
    // Verifica se o orderId existe como uma chave no objeto
    if (orderId in orderItems) {
      // Obtém o array correspondente ao orderId
      let foundArray = orderItems[orderId];
      // Agora você pode acessar os objetos dentro do array encontrado
      foundArray.forEach((obj) => {
        // console.log("Objeto encontrado:", obj);
        foundObjectsArray.push(obj);
      });
    } else {
      console.log("Nenhum array encontrado para o orderId:", orderId);
    }

    setTableDataAuth(foundObjectsArray); // Atualiza a tabela com os order items do order clicado
    setShowModalOrderAuth(true); // Abre a modal
  }

  // Função para atualizar o produto
  const updateProduct = async () => {
    if (!quantityToAdd) {
      return toast.current.show({
        severity: "error",
        summary: "Falha!",
        detail: "Por favor insira uma quantidade.",
        life: 3000,
      });
    }

    console.log("orders: ", orders);
    const updatedOrders = [...orders];

    const newItem = {
      productId: selectedProduct.id,
      product: selectedProduct.name,
      quantityInStock: parseFloat(quantity),
      newQuantity: parseFloat(quantityToAdd),
      // newQuantity: 0,
    };

    updatedOrders.push(newItem);
    setOrders(updatedOrders);
    setShowModal(false);
    setQuantityToAdd("");
    setSelectedProduct({ ...selectedProduct, quantityToAdd: "" });

    getCategory();

    if (!quantityToAdd || !selectedCardQuantity) {
      toast.current.show({
        severity: "error",
        summary: "Falha!",
        detail: "Quantidades necessárias!",
        life: 3000,
      });
      return;
    }
  };

  // Função para atualizar a quantidade
  const updateProductQuantity = async () => {
    // console.log("orders: ", orders);
    const updatedOrders = [...orders];

    const newItem = {
      productId: selectedProduct.id,
      product: selectedProduct.name,
      quantityInStock: parseFloat(quantity),
      newQuantity: 0,
      // newQuantity: parseFloat(quantityToAdd),
    };
    updatedOrders.push(newItem);
    setOrders(updatedOrders);
    setShowModal(false);
    setQuantityToAdd("");
    setSelectedProduct({ ...selectedProduct, quantityToAdd: "" });

    if (!selectedCardQuantity) {
      toast.current.show({
        severity: "error",
        summary: "Falha!",
        detail: "Quantidades necessárias!",
        life: 3000,
      });
      return;
    }
  };

  // Efeito para buscar a lista de produtos
  async function getCategory() {
    try {
      const response = await api.get("/admin/product");
      const dados = response.data;

      const filterProducts = dados.filter(
        (product) => product.originCityHall === false
      );

      const filter = dados.filter((product) => product.originCityHall === true);

      console.log(dados);
      console.log(filter);

      // Atualiza o estado interno antes de definir o estado final
      setCli(filter);

      console.log(cli);
      setProductsCityHall(filterProducts);
    } catch (error) {
      // Lidar com erros, se necessário
      console.error("Erro ao obter categoria:", error);
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        await getCategory();
        await getOrders();
        // setLoadingPage(false);
        setTimeout(() => setLoadingPage(false), 500);
      } catch (error) {
        // Lidar com erros, se necessário
        console.error("Erro ao buscar dados:", error);
        setLoadingPage(false); // Certifique-se de desativar o carregamento em caso de erro
      }
    }

    fetchData();
  }, []);

  const validitStatus = (status) => {
    if (status === "pendente") {
      return <span className="badge bg-warning">Pendente</span>;
    } else {
      return <span className="badge bg-success">Chegou</span>;
    }
  };

  async function getOrders() {
    try {
      const response = await api.get("/admin/order/show/orders");
      // console.log("get orders: ", response);
      const dados = response.data;

      // console.log(dados);

      const fromPrefeitura = await api.get("/admin/order/prefeitura");
      const prefeitura = fromPrefeitura.data;

      const notPrefeitura = await api.get("/admin/order/not/prefeitura");
      const Notprefeitura = notPrefeitura.data;

      // setCli(prefeitura);
      // console.log(prefeitura);

      // console.log(dados);
      setOrderAuth(Notprefeitura);
      setOrder(prefeitura); // Armazena os orders

      // console.log(dados);

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
      showError();
    }
  }

  const handleCheck = async (e, rowData) => {
    e.preventDefault();
    setLoading(true);
    // console.log("rowData: ", rowData);
    // console.log("id: ", rowData.id);

    try {
      await api.post(`/admin/order/updateProduct/${rowData.id}`, {
        status: "Chegou",
      });

      setLoading(false);
      setDisabled(true);

      await handleCardOrder(rowData.id);
      // await handleCardOrder(rowData.id);
      setShowModalOrder(false);
      setShowModalOrderAuth(false);

      toast.current.show({
        severity: "success",
        summary: "Sucesso!",
        detail: "O status do pedido foi atualizado!",
        life: 3000,
      });
    } catch (error) {
      showError();
      setLoading(false);
      console.error("Failed to submit order:", error);
    }
  };

  // Função para lidar com o envio do formulário
  async function handleSubmit(event) {
    setLoadingPage(true);
    event.preventDefault();

    if (!orderName || !expectedDate) {
      toast.current.show({
        severity: "error",
        summary: "Falha!",
        detail: "Informe um nome e uma data para o pedido!",
        life: 3000,
      });

      setLoadingPage(false);
    } else {
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
        getOrders();
        setLoadingPage(false);

        setAbaAtiva(origin === true ? "default-tab-2" : "default-tab-4");
      } catch (error) {
        setLoadingPage(false);
        toast.current.show({
          severity: "error",
          summary: "Falha!",
          detail: "Ocorreu uma falha ao criar o pedido, tente novamente!",
          life: 3000,
        });

        // console.error("Failed to submit order:", error);
      }
    }
  }

  return (
    <div className="vh-100">
      <Toast ref={toast} />
      {loadingPage ? (
        <Loader />
      ) : (
        <div
          className={`pos pos-customer ${"pos-mobile-sidebar-toggled"}`}
          id="pos-customer"
        >
          <div className="pos-content">
            <PerfectScrollbar className="pos-content-container">
              <div className="product-row">
                <div className="col-lg-12">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a
                        href="#default-tab-1"
                        data-bs-toggle="tab"
                        className={`nav-link  ${
                          abaAtiva === "default-tab-1" ? "active" : ""
                        }`}
                      >
                        <span className="d-sm-none">Produtos Prefeitura</span>
                        <span className="d-sm-block d-none">
                          Produtos Prefeitura
                        </span>
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        href="#default-tab-2"
                        data-bs-toggle="tab"
                        className={`nav-link  ${
                          abaAtiva === "default-tab-2" ? "active" : ""
                        }`}
                      >
                        <span className="d-sm-none">Entradas Prefeitura</span>
                        <span className="d-sm-block d-none">
                          Entradas Prefeitura
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#default-tab-3"
                        data-bs-toggle="tab"
                        className={`nav-link  ${
                          abaAtiva === "default-tab-3" ? "active" : ""
                        }`}
                      >
                        <span className="d-sm-none">Produtos Autorizados</span>
                        <span className="d-sm-block d-none">
                          {" "}
                          Produtos Autorizados
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#default-tab-4"
                        data-bs-toggle="tab"
                        className={`nav-link  ${
                          abaAtiva === "default-tab-4" ? "active" : ""
                        }`}
                      >
                        <span className="d-sm-none">Entradas Autorizadas</span>
                        <span className="d-sm-block d-none">
                          {" "}
                          Entradas Autorizadas
                        </span>
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content panel rounded-0 p-3 m-0">
                    <div
                      className={`tab-pane fade  ${
                        abaAtiva === "default-tab-1" ? "active show" : ""
                      }`}
                      id="default-tab-1"
                    >
                      <div className="invoice-header">
                        <div className="invoice-from">
                          <div className="d-flex row">
                            {cli.map((item) => (
                              <div key={item.id} className="col-lg-4 pb-3">
                                <div className="container">
                                  <Link
                                    className="product bg-gray-100"
                                    data-bs-target="#"
                                    onClick={() => handleCardClick(item)}
                                  >
                                    <div className="text">
                                      <div className="text-end">
                                        <h1 className="text-blue">
                                          <i class="fa-solid fa-cart-shopping"></i>
                                        </h1>
                                      </div>
                                      <h2 className="text-blue">
                                        {item.name}{" "}
                                      </h2>
                                      <div>
                                        <div className="fw-bolder d-flex pt-3">
                                          <div className="desc">
                                            Categoria: {item.location}
                                          </div>
                                          <div className="price">
                                            Quantidade: {item.quantity}
                                          </div>
                                        </div>
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
                    <div
                      className={`tab-pane fade  ${
                        abaAtiva === "default-tab-2" ? "active show" : ""
                      }`}
                      id="default-tab-2"
                    >
                      <div className="invoice-header">
                        <div className="invoice-from">
                          <div className="d-flex row">
                            {order &&
                              order.map((item) => (
                                <>
                                  <div key={item.id} className="col-lg-4 pb-3">
                                    <div className="container">
                                      <Link
                                        className="product bg-gray-100"
                                        data-bs-target="#"
                                        onClick={() => handleCardOrder(item.id)}
                                      >
                                        <div className="text">
                                          <div className="text-end">
                                            <h1 className="text-blue">
                                              <i className="fa-solid fa-copy"></i>
                                            </h1>
                                          </div>
                                          <h2 className="text-blue">
                                            {item.name}{" "}
                                          </h2>
                                          <div>
                                            <div className="fw-bolder">
                                              Pedido realizado em:{" "}
                                              <span className="bolder">
                                                {formatDate(item.created_at)}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                                  </div>
                                </>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`tab-pane fade  ${
                        abaAtiva === "default-tab-3" ? "active show" : ""
                      }`}
                      id="default-tab-3"
                    >
                      <div className="invoice-header">
                        <div className="invoice-from">
                          <div className="d-flex row">
                            {productsCityHall.map((item) => (
                              <div key={item.id} className="col-lg-4 pb-3">
                                <div className="container">
                                  <Link
                                    className="product bg-gray-100"
                                    data-bs-target="#"
                                    onClick={() => handleCardClick(item)}
                                  >
                                    <div className="text">
                                      <div className="text-end">
                                        <h1 className="text-blue">
                                          <i class="fa-solid fa-cart-shopping"></i>
                                        </h1>
                                      </div>
                                      <h2 className="text-blue">
                                        {item.name}{" "}
                                      </h2>
                                      <div>
                                        <div className="fw-bolder d-flex pt-3">
                                          <div className="desc">
                                            Categoria: {item.location}
                                          </div>
                                          <div className="price">
                                            Quantidade: {item.quantity}
                                          </div>
                                        </div>
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
                    <div
                      className={`tab-pane fade  ${
                        abaAtiva === "default-tab-4" ? "active show" : ""
                      }`}
                      id="default-tab-4"
                    >
                      <div className="invoice-header">
                        <div className="invoice-from">
                          <div className="d-flex row">
                            {orderAuth &&
                              orderAuth.map((item) => (
                                <>
                                  <div key={item.id} className="col-lg-4 pb-3">
                                    <div className="container">
                                      <Link
                                        className="product bg-gray-100"
                                        data-bs-target="#"
                                        onClick={() =>
                                          handleCardOrderAuth(item.id)
                                        }
                                      >
                                        <div className="text">
                                          <div className="text-end">
                                            <h1 className="text-blue">
                                              <i className="fa-solid fa-copy"></i>
                                            </h1>
                                          </div>
                                          <h2 className="text-blue">
                                            {item.name}{" "}
                                          </h2>
                                          <div>
                                            <div className="fw-bolder">
                                              Pedido realizado em:{" "}
                                              <span className="bolder">
                                                {formatDate(item.created_at)}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                                  </div>
                                </>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* modal to show orders */}
              <OrderModal
                showModalOrder={showModalOrder}
                setShowModalOrder={setShowModalOrder}
                tableData={tableData}
                setTableData={setTableData}
                disabled={disabled}
                handleCheck={handleCheck}
                loading={loading}
                columns={columns}
              />
              {/* end modal to show orders auth*/}
              {/* modal to show orders auth */}
              <OrderAuthModal
                showModalOrderAuth={showModalOrderAuth}
                setShowModalOrderAuth={setShowModalOrderAuth}
                tableData={tableDataAuth}
                setTableData={setTableDataAuth}
                disabled={disabled}
                handleCheck={handleCheck}
                loading={loading}
                columns={columns}
              />
              {/* end modal to show orders */}
              {/* modal novo Pedido  */}
              <ProductModal
                quantity={quantity}
                origin={origin}
                setQuantity={setQuantity}
                showModal={showModal}
                setShowModal={setShowModal}
                quantityToAdd={quantityToAdd}
                setQuantityToAdd={setQuantityToAdd}
                selectedProduct={selectedProduct}
                updateProduct={updateProduct}
                updateProductQuantity={updateProductQuantity}
              />
              {/* end modal novo Pedido  */}
            </PerfectScrollbar>
          </div>
          <div className="pos-sidebar" id="pos-sidebar">
            <div className="pos-sidebar-nav">
              <ul className="nav nav-tabs nav-fill">
                <li className="nav-item">
                  <h5 className="pt-3">Nova Entrada</h5>
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
                    <p>Selecione um item para dar entrada.</p>
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
                        <label htmlFor="pedido">Descrição da Entrada</label>
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
                          <div className="text">
                            {order.newQuantity ? "Qtd á ser adicionada" : ""}
                          </div>
                          <div className="price">
                            {order.newQuantity ? order.newQuantity : ""}
                          </div>
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
                <hr />
                {orders.length > 0 && (
                  <div className="w-100">
                    <div className="w-100 text-center">
                      <div className="btn-row w-100">
                        <form onSubmit={handleSubmit}>
                          <button type="submit" className="btn btn-success p-4">
                            <i className="fa fa-check fa-fw fa-lg"></i>{" "}
                            Finalizar Entrada
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerOrder;
