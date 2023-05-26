import { getTable } from "./getDataTable";

export default async function updateTableData(setTableData) {
  const data = await getTable();
  setTableData(data);
}