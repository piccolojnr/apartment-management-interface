import CustomTable from "../../../components/table";
import DeviceCell from "../../../components/table/cells/device-cell";
import DeviceForm from "../device-forms";
import useTableView from "../../../hooks/use-table-view";
import { devices } from "../../../_mock/device";
import { FilterProps } from "../../../types/table";

const headLabel = [
  { id: "id", label: "ID" },
  { id: "type", label: "Type" },
  { id: "apartment.name", label: "Apartment" },
  { id: "status", label: "Status" },
  { id: "created_at", label: "Created At" },
  { id: "updated_at", label: "Updated At" },
  { id: "" },
  { id: "" },
];

const filters: FilterProps<any>[] = [
  { id: "all", name: "All" },
  { id: "active", value: 0, name: "Active", field: "status" },
  { id: "disabled", value: 1, name: "Disabled", field: "status" },
  { id: "pending", value: 2, name: "Pending", field: "status" },
  { id: "water", value: "WATER", name: "Water", field: "type" },
  { id: "electric", value: "ELECTRIC", name: "Electric", field: "type" },
];

export default function DeviceView() {
  const {
    data,
    query,
    filter,
    order,
    orderBy,
    setQuery,
    setOrder,
    setOrderBy,
    setFilter,
  } = useTableView(devices, "apartment", ["apartment.name"], filters);

  return (
    <CustomTable
      AddModal={DeviceForm}
      UpdateModal={DeviceForm}
      headLabel={headLabel}
      title={"Devices"}
      searchPlaceholder={"Search devices..."}
      deleteItem={() => Promise.resolve()}
      Cell={DeviceCell}
      data={data}
      fetchData={() => {}}
      error={null}
      loading={false}
      setPage={() => {}}
      page={0}
      total={0}
      query={query}
      setQuery={setQuery}
      filter={filter}
      setFilter={setFilter}
      filters={filters}
      order={order}
      orderBy={orderBy as any}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
    />
  );
}
