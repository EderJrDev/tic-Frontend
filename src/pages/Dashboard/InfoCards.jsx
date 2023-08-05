import { api } from "../../utils/api";
import error from "../../utils/errors";
import { addNotification } from "../../utils/notifications";

export async function InfoCards(Setproducts, Setbudget, SetOrder, SetCategory) {
  try {
    const getProducts = await api.get("/admin/product");
    let products = getProducts.data;
    let productsCont = products.length;
    Setproducts(productsCont);

    const getBudget = await api.get("/admin/budget");
    let budget = getBudget.data;
    let budgetCont = budget.length;
    Setbudget(budgetCont);

    const getOrder = await api.get("/admin/order");
    let order = getOrder.data;
    let ordersCont = order.length;
    SetOrder(ordersCont);

    const getCategory = await api.get("/admin/category");
    let category = getCategory.data;
    let categoriesCont = category.length;
    SetCategory(categoriesCont);
  } catch (e) {
    addNotification(
      'danger',
      'Falha na requisição!',
      `${error.errorApi} Status: ${e}`,
      'top-right'
    );
  }
}