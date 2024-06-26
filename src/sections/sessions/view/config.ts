import { Apartment, BillType, Device, DeviceType } from "../../../types/table";
import { fDate } from "../../../utils/format-time";

export const deviceTypes: Device[] = [
    {
        id: 1,
        deviceName: "Device 1",
        deviceType: {
            id: 1,
            deviceType: "Device Type 1",
        },
        billType: {
            id: 1,
            billType: "Bill Type 1",
            unit: "Unit 1",
        },
        apartment: {
            id: 1,
            name: "Apartment 1",
            floor: 1,
        },
        dateAdded: "2021-10-10",
    },
    {
        id: 2,
        deviceName: "Device 2",
        deviceType: {
            id: 2,
            deviceType: "Device Type 2",
        },
        billType: {
            id: 2,
            billType: "Bill Type 2",
            unit: "Unit 2",
        },
        apartment: {
            id: 2,
            name: "Apartment 2",
            floor: 2,
        },
        dateAdded: "2021-10-10",
    },
    {
        id: 3,
        deviceName: "Device 3",
        deviceType: {
            id: 3,
            deviceType: "Device Type 3",
        },
        billType: {
            id: 3,
            billType: "Bill Type 3",
            unit: "Unit 3",
        },
        apartment: {
            id: 3,
            name: "Apartment 3",
            floor: 3,
        },
        dateAdded: "2021-10-10",
    },
];

export const deviceTypesColumns = [
    { field: "id", headerName: "ID" },
    {
        field: "deviceName",
        headerName: "Device Name",
        render: (value: string) => value,
    },
    {
        field: "deviceType",
        headerName: "Device Type",
        render: (value: DeviceType) => value.deviceType,
    },
    {
        field: "billType",
        headerName: "Bill Type",
        render: (value: BillType) => value?.billType || "",
    },
    {
        field: "apartment",
        headerName: "Apartment",
        render: (value: Apartment) => value?.name || "",
    },
    {
        field: "dateAdded", headerName: "Date Added",
        render: (value: any) => fDate(value)
    },
];

export const billTypes: BillType[] = [
    { id: 1, billType: "Bill Type 1", unit: "Unit 1" },
    { id: 2, billType: "Bill Type 2", unit: "Unit 2" },
    { id: 3, billType: "Bill Type 3", unit: "Unit 3" },
];

export const billTypesColumns = [
    { field: "id", headerName: "ID" },
    { field: "billType", headerName: "Bill Type" },
    { field: "unit", headerName: "Unit" },
];
