import { faker } from "@faker-js/faker";
import { BillType } from "@/types/table";

export const billTypes: BillType[] = [...Array(10)].map((_, index) => ({
    id: index,
    billType: faker.lorem.word(),
    unit: faker.lorem.word(),
}))
