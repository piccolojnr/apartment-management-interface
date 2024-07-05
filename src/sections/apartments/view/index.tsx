import { useState } from "react";
import { apartments } from "../../../_mock/apartments";
import useTableView from "@hooks/use-table-view";

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
  const [_data, setData] = useState(apartments);
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
  } = useTableView(_data, setData, "name", ["name"], filters);
  return (
    <></>
    // <CustomTable
    //   headLabel={headLabel}
    //   title={"Apartments"}
    //   searchPlaceholder={"Search apartments..."}
    //   deleteItem={() => Promise.resolve()}
    //   Cells={ApartmentCell}
    //   data={data}
    //   error={null}
    //   loading={false}
    //   setPage={() => {}}
    //   page={0}
    //   total={0}
    //   query={query}
    //   setQuery={setQuery}
    //   order={order}
    //   orderBy={orderBy as any}
    //   setOrder={setOrder}
    //   setOrderBy={setOrderBy}
    // />
  );
}
