import { faker } from "@faker-js/faker";
import { Tariff } from "../types/table";


export const tariffs: Tariff[] = [...Array(10)].map((_, index) => ({
    id: index,
    amount: faker.number.float(),
    billType: {
        id: faker.number.int(),
        billType: faker.lorem.word(),
        unit: faker.lorem.word(),
    },
    dateAdded: faker.date.recent().toISOString(),
    per: faker.number.float(),

}))