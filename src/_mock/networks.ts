import { faker } from "@faker-js/faker";
import { Network } from "@/types/table";


export const networks: Network[] = [...Array(10)].map((_, index) => ({
    id: index,
    network: faker.lorem.word(),
}))