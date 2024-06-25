import { faker } from "@faker-js/faker";
import { ContactPerson } from "../types/table";


export const contacts: ContactPerson[] = [...Array(10)].map((_, index) => ({
    id: index,
    name: faker.person.fullName(),
    phoneNumber: faker.phone.number(),
    email: faker.internet.email(),
    network: {
        id: faker.number.int(),
        network: faker.lorem.word(),
    },
    apartment: {
        id: faker.number.int(),
        name: faker.lorem.word(),
        floor: faker.number.int({ min: 1, max: 10 }),
    },

}))