import React, { Dispatch, SetStateAction } from "react";

export interface ContactPerson {
    id: number;
    name: string;
    telephoneNumber: string;
    email: string;
    apartment: Apartment;
    network: Network;
    primaryContact: boolean
}
export interface Role {
    id: number;
    name: string;
}

export interface User {
    id: number;
    username: string;
    role: Role;
}
export interface UtilityType {
    id: number;
    utilityType: string;
    unit: string;
    fixedRate: number,
}
export interface Network {
    id: number;
    network: string;
}
export interface Tariff {
    id: number;
    amount: number;
    per: number;
    utilityType: UtilityType;
    dateAdded: string;
}
export interface BillType {
    id: number;
    billType: string;
    unit: string;
}
export interface BillSession {
    id: number;
    startDate: string;
    endDate: string;
    year: number;
    dateCreated: string;
}
export interface Bill {
    id: number;
    apartment: Apartment;
    billSession: BillSession;
    billType: BillType;
    consumption: number;
    dateAdded: string;
    reading: number;
}

export interface Apartment {
    id: number;
    name: string;
    floor: number;
}

export interface Device {
    id: number;
    apartment: Apartment;
    utilityType: UtilityType;
    billType: BillType;
    dateAdded: string;
    deviceName: string;
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
    filter?: FilterProps<any>;
}

export interface CustomTableProps<T> extends TableProps {
    head?: React.ReactNode;
    filters?: FilterProps<T>[],
    deleteItem?: (id: string) => Promise<void>;
    Cells: React.FC<{ data: Data, updateSingleData: (data: Data) => void }>;
    data: Data<T>[];
    error?: any;
    loading?: boolean;
    total?: number;
    page?: number;
    setPage?: (page: number) => void;
    order?: "desc" | "asc";
    orderBy?: string;
    setOrder?: (v: "desc" | "asc") => void;
    setOrderBy?: Dispatch<SetStateAction<any>>;
    filter?: FilterProps<T>;
    setFilter?: Dispatch<SetStateAction<FilterProps<T>>>;
    query?: string;
    setQuery?: (v: string) => void;
    handleDelete?: (item: Data) => void;
}

export interface TableToolbarProps {
    numSelected: number;
    setFilter?: Dispatch<SetStateAction<FilterProps<any>>>;
    query: string;
    onFilter: (v: React.ChangeEvent<{ value: string }>) => void;
    onDelete?: (item: Data) => void;
    selected: Data[];
    filters?: FilterProps<any>[];
    title: string;
}

export interface CustomTableRowProps {
    selected: any;
    data: Data;
    handleClick: any;
    updateSingleData: (data: Data) => void;
    Cells: React.FC<{ data: Data, updateSingleData: (data: Data) => void }>;
}