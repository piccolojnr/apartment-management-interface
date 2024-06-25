import { faker } from "@faker-js/faker";
import { DeviceType } from "../types/table";


export const deviceTypes: DeviceType[] = [...Array(10)].map((_, index) => ({
    id: index,
    deviceType: faker.lorem.word(),
    
}))