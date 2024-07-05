import { Dispatch, SetStateAction } from "react";
import { FilterProps } from "../../../types/table";

export interface Column {
    field: string;
    headerName: string;
    renderCell?: (value: any, row: any) => React.ReactNode;
    align?: "left" | "right" | "center";
}

export interface ReusableTableProps {
    columns: Column[];
    data: any[];
    title?: string;
    onClickRow?: (row: any) => void;
    CustomTollbarIcons?: React.FC<{
        selected: any[]
    }>[];
    filters?: FilterProps<any>[];
}

export interface CustomTableToolbarProps {
    title: string;
    searchQuery: string;
    handleSearch: (query: string) => void;
    selected: any[];
    CustomTollbarIcons?: React.FC<{
        selected: any[]
    }>[];
    filters?: FilterProps<any>[];
    filter?: FilterProps<any>;
    setFilter?: Dispatch<SetStateAction<FilterProps<any>>>;

}