import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { TabView, TabPanel } from "primereact/tabview";
import { Accordion, AccordionTab } from "primereact/accordion";

import { api } from "../../utils/api";
import Input from "../../components/Inputs/Input";
import { InputNumber } from "primereact/inputnumber";
import MaskInput from "../../components/Inputs/MaskInput";
import ExportTable from "../../components/button/ExportTable";
import { Panel, PanelBody, PanelHeader } from "../../components/panel/panel";

import { saveAs } from "file-saver";

function Budget() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [valorA, setValorA] = useState("");
  const [valorB, setValorB] = useState("");
  const [valorC, setValorC] = useState("");
  const [unidade, setUnidade] = useState("");
  const [descricao, setDescricao] = useState("");

  const [disabledPanel, setDisabledPanel] = useState(false);
  const [disabledProducts, setDisabledProducts] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);
  const [budget_products, setProducts] = useState([]);

  const [budgetId, setBudgetId] = useState(0);
  const [budget_companyId, setBudgetCompanyId] = useState(0);

  const [tableData, setTableData] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const columns = [
    { field: "id", header: "ID" },
    { field: "name", header: "Nome" },
    { field: "rg", header: "RG" },
    { field: "cpf", header: "CPF" },
    { field: "responsible_name", header: "Nome do Responsável" },
  ];

  const exportColumns = columns.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

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
      detail: "Ocorreu um problema ao salvar as informações!",
      life: 3000,
    });
  };

  const addProduct = (e) => {
    e.preventDefault();

    const product = {
      descricao,
      unidade: parseInt(unidade),
      valorA: parseInt(valorA),
      valorB: parseInt(valorB),
      valorC: parseInt(valorC),
    };

    setProducts([...budget_products, product]);
    setDescricao("");
    setUnidade("");
    setValorA("");
    setValorB("");
    setValorC("");
    console.log(product);

    if (
      descricao === "" ||
      unidade === NaN ||
      valorA === NaN ||
      valorB === NaN ||
      valorC === NaN
    ) {
      toast.current.show({
        severity: "error",
        summary: "Falha!",
        detail: "Informe todos os dados para criar um novo produto!",
        life: 3000,
      });

      return;
    } else {
      setShowDialog(false);
      setActiveIndex(0);

      setDisabledPanel(false);
      setDisabledProducts(true);

      toast.current.show({
        severity: "success",
        summary: "Sucesso!",
        detail:
          "O produto foi adicionado com sucesso, já é possível adicionar outro.",
        life: 3000,
      });
    }
  };

  const onSubmit = async (data) => {
    // console.log("DATA.VALUE ", data);
    try {
      const createBudget = await api.post(`/admin/budget/createBudget`, {
        name: data.name,
        responsible_name: data.responsible_name,
        rg: data.rg,
        cpf: data.cpf,
      });

      const createBudgetCompany = await api.post(
        `/admin/budget/createBudgetCompany`,
        {
          budget_companies: [
            {
              razao_social: data.razaoEmpA,
              cnpj: data.cnpjEmpA,
              telefone: data.telEmpA,
              budgetId: createBudget.data.id,
            },
            {
              razao_social: data.razaoEmpB,
              cnpj: data.cnpjEmpB,
              telefone: data.telEmpB,
              budgetId: createBudget.data.id,
            },
            {
              razao_social: data.razaoEmpB,
              cnpj: data.cnpjEmpB,
              telefone: data.telEmpB,
              budgetId: createBudget.data.id,
            },
          ],
        }
      );

      setDisabledProducts(false);
      setDisabledPanel(true);

      setBudgetId(createBudget.data.id);
      setBudgetCompanyId(createBudgetCompany.data.createdBudgetProduct.id);

      setActiveIndex(1);
      showSuccess();
      reset();
    } catch (e) {
      showError();
      console.log(e);
    }
  };

  const saveProducts = async () => {
    const newProduct = {
      descricao,
      unidade: parseInt(unidade),
      valorA: parseInt(valorA),
      valorB: parseInt(valorB),
      valorC: parseInt(valorC),
    };

    // Adicionamos os IDs
    newProduct.budget_companyId = budget_companyId ? budget_companyId : 0;
    newProduct.budgetId = budgetId ? budgetId : 0;

    // Criamos uma cópia do array existente e adicionamos o novo produto
    const updatedProducts = [...budget_products, newProduct];

    // Adicionamos os IDs em todos os objetos do array
    const productsWithIds = updatedProducts.map((product) => ({
      ...product,
      budget_companyId: budget_companyId ? budget_companyId : 0,
      budgetId: budgetId ? budgetId : 0,
    }));

    try {
      if (
        descricao === "" ||
        isNaN(unidade) ||
        isNaN(valorA) ||
        isNaN(valorB) ||
        isNaN(valorC)
      ) {
        toast.current.show({
          severity: "error",
          summary: "Falha!",
          detail: "Informe todos os dados para criar um novo produto!",
          life: 3000,
        });

        return;
      }

      // Atualizamos o estado com os produtos atualizados
      setProducts(productsWithIds);

      // Limpa os campos de entrada
      setDescricao("");
      setUnidade("");
      setValorA("");
      setValorB("");
      setValorC("");

      console.log(productsWithIds);

      const requestPayload = {
        budget_products: productsWithIds,
      };

      const createProduct = await api.post(
        `/admin/budget/createBudgetProduct`,
        requestPayload
      );

      console.log(createProduct);

      showSuccess();
      setShowDialog(false);
      setActiveIndex(0);

      setDisabledPanel(false);
      setDisabledProducts(true);
    } catch (e) {
      showError();
      console.log(e);
    }
  };

  const budgetDownload = async (e, rowData) => {
    console.log(rowData);
    try {
      const response = await api.get(
        `/admin/budget/print_budget/${rowData.id}`,
        {
          responseType: "blob", // Indica que a resposta é um blob (Binary Large Object)
        }
      );

      // Cria um Blob a partir dos dados recebidos
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Usa o file-saver para realizar o download do Blob como um arquivo PDF
      saveAs(blob, `budget_${rowData.id}.pdf`);

      toast.current.show({
        severity: "success",
        summary: "Sucesso!",
        detail: "Orçamento foi baixado com exito.",
        life: 3000,
      });
    } catch (error) {
      showError();
      console.error("Erro ao fazer o download do PDF", error);
      // Lide com o erro de acordo com suas necessidades
    }
  };

  useEffect(() => {
    const getBudget = async () => {
      const response = await api.get("/admin/budget/");
      setTableData(response.data);
    };
    getBudget();
  }, [showDialog]);

  return (
    <div>
      <Toast ref={toast} />
      {/* modal  */}
      <div className="d-flex justify-content-between">
        <div>
          <h1 className="page-header">Orçamentos</h1>
        </div>
        <div>
          <button
            className="btn btn-info btn-btn-sm"
            onClick={() => setShowDialog(true)}
          >
            Adicionar <i className="bi bi-plus-circle"></i>
          </button>
        </div>
      </div>
      <Dialog
        modal
        header="Novo Orçamento"
        visible={showDialog}
        style={{ width: "80vw" }}
        contentStyle={{ height: "750px" }}
        onHide={() => setShowDialog(false)}
      >
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel
            header="Orçamento"
            leftIcon="pi pi-calendar mr-2"
            disabled={disabledPanel}
          >
            <div className="row pb-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-4">
                    <Input
                      name="name"
                      control={control}
                      label="Nome do Orçamento"
                    />
                  </div>
                </div>
                <div>
                  <div className="row d-flex">
                    <div className="col-lg-4">
                      <Input
                        name="responsible_name"
                        control={control}
                        label="Nome do Responsável"
                      />
                    </div>
                    <div className="col-lg-4">
                      <MaskInput
                        name="rg"
                        control={control}
                        mask="99.999.999-9"
                        placeholder="RG"
                        errors={errors}
                      />
                    </div>
                    <div className="col-lg-4">
                      <MaskInput
                        name="cpf"
                        control={control}
                        mask="999.999.999-99"
                        placeholder="CPF"
                        errors={errors}
                      />
                    </div>
                  </div>
                </div>
                <div className="py-3">
                  <Accordion activeIndex={0}>
                    <AccordionTab
                      header={
                        <div className="flex align-items-center">
                          <i className="pi pi-calendar mr-2"></i>
                          <span className="vertical-align-middle">
                            Empresa A
                          </span>
                        </div>
                      }
                    >
                      <div>
                        <div className="row d-flex">
                          <div className="col-lg-4">
                            <Input
                              name="razaoEmpA"
                              control={control}
                              label="Razão Social"
                            />
                          </div>
                          <div className="col-lg-4">
                            <MaskInput
                              name="cnpjEmpA"
                              control={control}
                              mask="99.999.999/9999-99"
                              placeholder="CNPJ"
                              errors={errors}
                            />
                          </div>
                          <div className="col-lg-4">
                            <MaskInput
                              name="telEmpA"
                              control={control}
                              mask="(99) 999999-9999"
                              placeholder="Telefone"
                              errors={errors}
                            />
                          </div>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      header={
                        <div className="flex align-items-center">
                          <i className="pi pi-user mr-2"></i>
                          <span className="vertical-align-middle">
                            Empresa B
                          </span>
                        </div>
                      }
                    >
                      <div className="row d-flex">
                        <div className="col-lg-4">
                          <Input
                            name="razaoEmpB"
                            control={control}
                            label="Razão Social"
                          />
                        </div>
                        <div className="col-lg-4">
                          <MaskInput
                            name="cnpjEmpB"
                            control={control}
                            mask="99.999.999/9999-99"
                            placeholder="CNPJ"
                            errors={errors}
                          />
                        </div>
                        <div className="col-lg-4">
                          <MaskInput
                            name="telEmpB"
                            control={control}
                            mask="(99) 99999-9999"
                            placeholder="Telefone"
                            errors={errors}
                          />
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      header={
                        <div className="flex align-items-center">
                          <i className="pi pi-search mr-2"></i>
                          <span className="vertical-align-middle">
                            Empresa C
                          </span>
                          <i className="pi pi-cog ml-2 ml-2"></i>
                        </div>
                      }
                    >
                      <div className="row d-flex">
                        <div className="col-lg-4">
                          <Input
                            name="razaoEmpC"
                            control={control}
                            label="Razão Social"
                          />
                        </div>
                        <div className="col-lg-4">
                          <MaskInput
                            name="cnpjEmpC"
                            control={control}
                            mask="99.999.999/9999-99"
                            placeholder="CNPJ"
                            errors={errors}
                          />
                        </div>
                        <div className="col-lg-4">
                          <MaskInput
                            name="telEmpC"
                            control={control}
                            mask="(99) 99999-9999"
                            placeholder="Telefone"
                            errors={errors}
                          />
                        </div>
                      </div>
                    </AccordionTab>
                  </Accordion>
                </div>
                <div className="text-center">
                  <Button
                    type="submit"
                    severity="success"
                    icon="bi bi-arrow-right-circle"
                    label="Avançar"
                  />
                </div>
              </form>
            </div>
          </TabPanel>
          <TabPanel
            header="Produtos"
            rightIcon="pi pi-user ml-2"
            disabled={disabledProducts}
          >
            <div>
              <div className="row d-flex justify-content-between">
                <div className="col-md-6">
                  <h2>Novo Produto</h2>
                </div>
              </div>
              <div className="row d-flex">
                <div className="col-lg-4 pb-3">
                  <InputText
                    name="descricao"
                    className="form-control p-inputtext-sm"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    label="Descrição"
                    required
                    placeholder="Descrição"
                  />
                </div>
                <div className="col-lg-4">
                  <InputNumber
                    inputId="currency-pt"
                    value={unidade}
                    onValueChange={(e) => setUnidade(e.value)}
                    className="w-100 p-inputtext-sm"
                    label="Unidades"
                    required
                    placeholder="Unidades"
                  />
                </div>
                <div className="col-lg-4">
                  <InputNumber
                    inputId="currency-pt"
                    value={valorA}
                    onValueChange={(e) => setValorA(e.value)}
                    mode="currency"
                    currency="BRL"
                    locale="pt-BR"
                    className="w-100 p-inputtext-sm"
                    label="Valor Empresa A"
                    required
                    placeholder="Valor Empresa A"
                  />
                </div>
                <div className="col-lg-4">
                  <InputNumber
                    inputId="currency-pt"
                    value={valorB}
                    onValueChange={(e) => setValorB(e.value)}
                    mode="currency"
                    currency="BRL"
                    locale="pt-BR"
                    className="w-100 p-inputtext-sm"
                    label="Valor Empresa B"
                    required
                    placeholder="Valor Empresa B"
                  />
                </div>
                <div className="col-lg-4 pb-3">
                  <InputNumber
                    inputId="currency-pt"
                    value={valorC}
                    onValueChange={(e) => setValorC(e.value)}
                    mode="currency"
                    currency="BRL"
                    locale="pt-BR"
                    className="w-100 p-inputtext-sm"
                    label="Valor Empresa C"
                    required
                    placeholder="Valor Empresa C"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="text-end">
                <Button
                  label="Novo Produto"
                  onClick={(e) => addProduct(e)}
                  icon="bi bi-plus-circle"
                  className="me-2"
                />

                <Button
                  label="Finalizar"
                  severity="success"
                  onClick={saveProducts}
                  icon="bi bi-send"
                />
              </div>
            </div>
          </TabPanel>
        </TabView>
      </Dialog>
      <div className="row">
        <div className="col-xl-12">
          <Panel>
            <PanelHeader className="bg-cyan-700 text-white">
              Últimos Orçamentos
            </PanelHeader>
            <PanelBody>
              <ExportTable
                tableData={tableData}
                exportColumns={exportColumns}
                globalFilterValue={globalFilterValue}
                onGlobalFilterChange={(e) =>
                  setGlobalFilterValue(e.target.value)
                }
              />
              <DataTable
                stripedRows
                showGridlines
                value={tableData}
                paginator
                rows={5}
                sortMode="multiple"
                selectionMode="single"
                globalFilter={globalFilterValue}
                rowsPerPageOptions={[5, 25, 50]}
                tableStyle={{ minWidth: "1rem", fontSize: "0.8rem" }}
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
                  header="Baixar Orçamento"
                  body={(rowData) => (
                    <button
                      className="btn btn-success btn-btn-sm"
                      onClick={(e) => budgetDownload(e, rowData)}
                    >
                      <i className="bi bi-download"></i>
                    </button>
                  )}
                />
              </DataTable>
            </PanelBody>
          </Panel>
        </div>
      </div>
      {/* end modal  */}
    </div>
  );
}

export default Budget;
