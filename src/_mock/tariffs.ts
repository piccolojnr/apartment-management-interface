import { faker } from "@faker-js/faker";
import { Tariff } from "@/types/table";


export const tariffs: Tariff[] = [...Array(10)].map((_, index) => ({
    id: index,
    amount: faker.number.float(),
    utilityType: {
        id: faker.number.int(),
        utilityType: faker.lorem.word(),
        unit: faker.lorem.word(),
        fixedRate: faker.number.float()
    },
    dateAdded: faker.date.recent().toISOString(),
    per: faker.number.float(),

}))