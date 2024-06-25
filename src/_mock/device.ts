import { faker } from "@faker-js/faker";
import { Device } from "../../src/types/table";

export const devices: Device[] = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    type: faker.commerce.productName(),
    name: faker.commerce.productName(),
}));