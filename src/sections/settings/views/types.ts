export interface Column {
    field: string;
    headerName: string;
    renderCell?: (value: any, row: any) => React.ReactNode;
    align?: "left" | "right" | "center";
}

export interface ReusableTableProps {
    columns: Column[];
    data: any[];
    onDeletion?: (id: number) => void;
    onSendSms?: (ids: number[]) => void;
    title?: string;
}