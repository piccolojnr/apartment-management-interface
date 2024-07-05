import { faker } from "@faker-js/faker";
import { Apartment } from "@/types/table";

export const apartments: Apartment[] = [...Array(10)].map((_, index) => ({
    id: index,
    name: faker.lorem.word(),
    floor: faker.number.int({ min: 1, max: 10 }),
}))


