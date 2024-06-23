import { apartments } from "../../../_mock/apartments";
import CustomTable from "../../../components/table";
import ApartmentCell from "../../../components/table/cells/apartment-cell";
import useTableView from "../../../hooks/use-table-view";
import ApartmentForm from "../apartment-forms";

const headLabel = [
  { id: "name", label: "Name" },
  { id: "water_meter", label: "Water Meter" },
  { id: "electricity_meter", label: "Electricity Meter" },
  { id: "created_at", label: "Created At" },
  { id: "updated_at", label: "Updated At" },
  { id: "" },
  { id: "" },
];

const filters = [{ id: "all", name: "All" }];

export default function ApartmentView() {
  const {
    data,
    filter,
    setFilter,
    order,
    orderBy,
    query,
    setOrder,
    setOrderBy,
    setQuery,
  } = useTableView(apartments, "name", ["name"], filters);
  return (
    <CustomTable
      AddModal={ApartmentForm}
      UpdateModal={ApartmentForm}
      headLabel={headLabel}
      title={"Apartments"}
      searchPlaceholder={"Search apartments..."}
      deleteItem={() => Promise.resolve()}
      Cell={ApartmentCell}
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
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
    />
  );
}
