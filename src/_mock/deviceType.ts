import { faker } from "@faker-js/faker";
import { UtilityType } from "@/types/table";


export const deviceTypes: UtilityType[] = [...Array(10)].map((_, index) => ({
    id: index,
    utilityType: faker.word.sample(),
    fixedRate: faker.number.float(),
    unit: faker.word.sample()
}))