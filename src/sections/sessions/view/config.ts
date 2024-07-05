import { Apartment, BillType, Device, UtilityType } from "../../../types/table";
import { fDate } from "../../../utils/format-time";
import { Column } from "../../settings/views/types";

export const utilityTypesColumns: Column[] = [
    { field: "id", headerName: "ID", },
    {
        field: "deviceName",
        headerName: "Device Name",
        renderCell: (value: string, row: any) => value,
    },
    {
        field: "utilityType",
        headerName: "Utility Type",
        renderCell: (value: UtilityType, row: any) => value.utilityType,
    },
    {
        field: "billType",
        headerName: "Bill Type",
        renderCell: (value: BillType, row: any) => value?.billType || "",
    },
    {
        field: "apartment",
        headerName: "Apartment",
        renderCell: (value: Apartment) => value?.name || "",
    },
    {
        field: "dateAdded", headerName: "Date Added",
        renderCell: (value: any) => fDate(value)
    },
];


