import { useEffect, useState } from "react";
import { Data, FilterProps } from "../types/table";
const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};
const useTableView = <T extends object>(
  data: Data<T>[],
  setData: React.Dispatch<React.SetStateAction<T[]>>,
  initialOrderby: keyof T,
  searchKeys: string[],
  filters: FilterProps<T>[]
) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterProps<T>>({
    id: "all",
    name: "All",
  });
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof T>(initialOrderby);

  useEffect(() => {
    const handleSearch = (q: string) => {
      setData(
        data.filter((item) =>
          searchKeys.some((key) =>
            String(getNestedValue(item, key)).toLowerCase().includes(q)
          )
        )
      );
    };

    handleSearch(query);
  }, [query]);

  useEffect(() => {
    const handleFilter = (f: FilterProps<T>) => {
      if (f.id === "all") {
        setData(data);
      } else {
        setData(
          data.filter((item) =>
            filter.field ? item[filter.field as never] === f.value : true
          )
        );
      }
    };

    handleFilter(filter);
  }, [filter, filters]);

  useEffect(() => {
    const handleSort = (o: "asc" | "desc", ob: keyof T) => {
      const sortedData = [...data].sort((a, b) => {
        const aValue = getNestedValue(a, ob as string);
        const bValue = getNestedValue(b, ob as string);

        if (aValue > bValue) return o === "asc" ? 1 : -1;
        if (aValue < bValue) return o === "asc" ? -1 : 1;
        return 0;
      });

      setData(sortedData);
    };

    handleSort(order, orderBy);
  }, [order, orderBy]);

  return {
    data,
    query,
    filter,
    setFilter,
    order,
    orderBy,
    setQuery,
    setOrder,
    setOrderBy,
  };
};

export default useTableView;
