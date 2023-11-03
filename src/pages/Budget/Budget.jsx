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
import MaskInput from "../../components/Inputs/MaskInput";
import ExportTable from "../../components/button/ExportTable";
import { Panel, PanelBody, PanelHeader } from "../../components/panel/panel";

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

  const [activeIndex, setActiveIndex] = useState(0);
  const [budget_products, setProducts] = useState([]);

  const [budgetId, setBudgetId] = useState(0);
  const [budget_companyId, setBudgetCompanyId] = useState(0);

  const [tableData, setTableData] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

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
    } else {
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
    console.log("DATA.VALUE ", data);
    try {
      const createBudget = await api.post(`/admin/budget/createBudget`, {
        name: data.name,
        responsible_name: data.responsible_name,
        rg: data.rg,
        cpf: data.cpf,
      });

      console.log(createBudget);
      console.log(createBudget.data.id);

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

      console.log(createBudgetCompany);
      console.log(createBudgetCompany.data.createdBudgetProduct.id);

      console.log(
        "obj: ",
        data.descricao,
        " / ",
        data.valorEmpresaA,
        " / ",
        data.valorEmpresaB,
        " / ",
        data.valorEmpresaC,
        " / ",
        data.unidade,
        " / ",
        createBudgetCompany.data.createdBudgetProduct.id,
        " / ",
        createBudget.data.id
      );

      setBudgetId(createBudget.data.id);
      setBudgetCompanyId(createBudgetCompany.data.createdBudgetProduct.id);

      console.log("DATA : ", data);
      setActiveIndex(1);
      showSuccess();
      reset();
    } catch (e) {
      showError();
      console.log(e);
    }
  };

  const saveProducts = async () => {
    const product = {
      descricao,
      unidade: parseInt(unidade),
      valorA: parseInt(valorA),
      valorB: parseInt(valorB),
      valorC: parseInt(valorC),
    };

    // Adicionamos os IDs
    product.budget_companyId = budget_companyId ? budget_companyId : 0;
    product.budgetId = budgetId ? budgetId : 0;

    // Adicionamos os IDs em todos os objetos do array
    budget_products.forEach((product) => {
      product.budget_companyId = budget_companyId ? budget_companyId : 0;
      product.budgetId = budgetId ? budgetId : 0;
    });
    console.log(product);
    try {
      if (!descricao || !unidade || !valorA || !valorB || !valorC) {
        toast.current.show({
          severity: "error",
          summary: "Falha!",
          detail: "Informe todos os dados para criar um novo produto!",
          life: 3000,
        });
      }

      setProducts([...budget_products, product]);
      setDescricao("");
      setUnidade(0);
      setValorA(0);
      setValorB(0);
      setValorC(0);

      console.log("budget ", budget_products);

      const createProduct = await api.post(
        `/admin/budget/createBudgetProduct`,
        {
          budget_products,
        }
      );

      console.log(createProduct);

      showSuccess();
    } catch (e) {
      showError();
      console.log(e);
    }
  };

  const budgetDownload = async (e, rowData) => {
    console.log(rowData);

    const response = await api.post(`/admin/budget/print_budget/${rowData.id}`);

    console.log(response);
  };

  useEffect(() => {
    const getBudget = async () => {
      const response = await api.get("/admin/budget/");
      setTableData(response.data);
    };
    getBudget();
  }, []);

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
            className="btn btn-success btn-btn-sm"
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
          <TabPanel header="Orçamento" leftIcon="pi pi-calendar mr-2">
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
                              mask="(99) 9999-9999"
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
                            mask="(99) 9999-9999"
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
                            mask="(99) 9999-9999"
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
          <TabPanel header="Produtos" rightIcon="pi pi-user ml-2">
            <div>
              <div className="row d-flex justify-content-between">
                <div className="col-md-6">
                  <h2>Novo Produto</h2>
                </div>
                <div className="col-lg-6 text-end pb-3">
                  <Button
                    label="Novo Produto"
                    onClick={(e) => addProduct(e)}
                    icon="bi bi-plus-circle"
                  />
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
                  <InputText
                    name="unidade"
                    type="tel"
                    className="form-control p-inputtext-sm"
                    value={unidade}
                    onChange={(e) => setUnidade(e.target.value)}
                    label="Unidade"
                    placeholder="Unidade"
                  />
                </div>
                <div className="col-lg-4">
                  <InputText
                    className="form-control p-inputtext-sm"
                    name="valorA"
                    value={valorA}
                    type="tel"
                    onChange={(e) => setValorA(e.target.value)}
                    label="Valor Empresa A"
                    placeholder="Valor Empresa A"
                  />
                </div>
                <div className="col-lg-4">
                  <InputText
                    className="form-control p-inputtext-sm"
                    name="valorB"
                    value={valorB}
                    type="tel"
                    onChange={(e) => setValorB(e.target.value)}
                    label="Valor Empresa B"
                    placeholder="Valor Empresa B"
                  />
                </div>
                <div className="col-lg-4 pb-3">
                  <InputText
                    className="form-control p-inputtext-sm"
                    name="valorC"
                    value={valorC}
                    type="tel"
                    onChange={(e) => setValorC(e.target.value)}
                    label="Valor Empresa C"
                    placeholder="Valor Empresa C"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="text-end">
                <Button
                  label="Salvar"
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
            <PanelHeader className="bg-teal-700 text-white">
              Últimos Orçamentos
            </PanelHeader>
            <PanelBody>
              <ExportTable
                tableData={tableData}
                exportColumns={exportColumns}
                globalFilterValue={globalFilterValue}
                onGlobalFilterChange={onGlobalFilterChange}
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
                      className="btn btn-info btn-btn-sm"
                      onClick={(e) => budgetDownload(e, rowData)}
                    >
                      <i className="bi bi-pencil-square"></i>
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
