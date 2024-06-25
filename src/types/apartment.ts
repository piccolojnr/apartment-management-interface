import { Apartment, Device } from "./table";

export interface ApartmentInfoProps {
    apartment: Apartment;
}


export interface DevicesListProps {
    devices: Device[];
}

export interface Person {
    id: string;
    name: string;
    primary?: boolean;
}

export interface PeopleListProps {
    people: Person[];
}