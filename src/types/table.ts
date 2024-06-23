import React, { Dispatch, SetStateAction } from "react";

export interface Apartament {
    id: string;
    name: string;
    water_meter?: number;
    electricity_meter?: number;
    created_at?: string;
    updated_at?: string;
}

export interface Device {
    id: string;
    type: string;
    apartment?: Apartament;
    status: number;
    session_period: {
        start: string,
        end: string
    },
    created_at: string;
    updated_at: string;
}

export type Data<T = any> = T & {};

export interface TableProps {
    headLabel: { id: string; label?: string; align?: string }[];
    title: string;
    searchPlaceholder: string;
}
export interface FilterProps<T> {
    id: string;
    name: string;
    value?: any;
    field?: keyof T;
}
export interface FiltersPopoverProps {
    open: HTMLElement | null;
    filters: FilterProps<any>[];
    handleClose: () => void;
    setFilter?: Dispatch<SetStateAction<FilterProps<any>>>;
}

export interface CustomTableProps<T> extends TableProps {
    head?: React.ReactNode;
    AddModal: React.FC<{ handleClose: () => void, data?: any }>;
    UpdateModal: React.FC<{ handleClose: () => void, data?: any }>;
    filters?: FilterProps<T>[],
    deleteItem?: (id: string) => Promise<void>;
    Cell: React.FC<{ data: Data, updateSingleData: (data: Data) => void }>;
    data: Data<T>[];
    fetchData: () => void;
    error: any;
    loading: boolean;
    total?: number;
    page?: number;
    setPage: (page: number) => void;
    order?: "desc" | "asc";
    orderBy?: string;
    setOrder?: (v: "desc" | "asc") => void;
    setOrderBy?: Dispatch<SetStateAction<any>>;
    filter?: FilterProps<T>;
    setFilter?: Dispatch<SetStateAction<FilterProps<T>>>;
    query?: string;
    setQuery?: (v: string) => void;
}

export interface TableToolbarProps {
    numSelected: number;
    setFilter?: Dispatch<SetStateAction<FilterProps<any>>>;
    query: string;
    onFilter: (v: React.ChangeEvent<{ value: string }>) => void;
    onDelete: (item: Data) => void;
    selected: Data[];
    filters?: FilterProps<any>[];
    title: string;
}

export interface CustomTableRowProps {
    selected: any;
    data: Data;
    handleClick: any;
    fetchData: () => void;
    UpdateModal: any;
    updateSingleData: (data: Data) => void;
    onDelete: (data: any) => any;
    Cell: React.FC<{ data: Data, updateSingleData: (data: Data) => void }>;
}