import { faker } from "@faker-js/faker";
import { Device } from "../../src/types/table";

export const devices: Device[] = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    apartment: {
        id: faker.number.int(),
        name: faker.person.suffix(),
        floor: faker.number.int(
            {
                min: 1,
                max: 10,
            }
        ),
    },
    utilityType: {
        id: index,
        utilityType: faker.word.sample(),
        fixedRate: faker.number.float(),
        unit: faker.word.sample()
    },
    billType: {
        id: faker.number.int(),
        billType: faker.word.words(),
        unit: faker.word.words(),
    },
    dateAdded: faker.date.recent().toISOString(),
    deviceName: faker.random.word(),

}));