import { FilterProps } from "@/types/table";
import { useState } from "react";

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
  const [_data, setData] = useState([]);

  return (
    <></>
    // <CustomTable
    //   headLabel={headLabel}
    //   title={"Devices"}
    //   searchPlaceholder={"Search devices..."}
    //   deleteItem={() => Promise.resolve()}
    //   Cells={DeviceCells}
    //   data={data}
    //   error={null}
    //   loading={false}
    //   setPage={() => {}}
    //   page={0}
    //   total={0}
    //   query={query}
    //   setQuery={setQuery}
    //   filters={filters}
    //   order={order}
    //   orderBy={orderBy as any}
    //   setOrder={setOrder}
    //   setOrderBy={setOrderBy}
    // />
  );
}
